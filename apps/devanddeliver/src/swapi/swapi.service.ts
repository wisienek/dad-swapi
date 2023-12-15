import { Inject, Injectable } from '@nestjs/common';
import { EndpointToClassMap, FilmsDto, Paginated, SwapiResources } from '@dad/shared';
import { SwapiClient } from './swapi.client';
import { GetAllInputDto, SwapiPagination } from './dto';
import { REDIS, RedisClient } from '@dad/redis';
import _ from 'lodash';

@Injectable()
export class SwapiService {
  private static Request_TTL = 60 * 60 * 24;

  constructor(@Inject(REDIS) private redis: RedisClient, private swapiClient: SwapiClient) {}

  /**
   * Returns all found resources
   * @param resource - name of the resource to search for
   * @param paginationData - optional options for pagination
   */
  public async getAll<T extends SwapiResources, U extends EndpointToClassMap[T]>(
    resource: T,
    paginationData: GetAllInputDto
  ): Promise<Paginated<U>> {
    const key = this.getCacheKey(resource);
    const fromCache: string = await this.redis.get(key);

    if (fromCache) {
      const parsed: U[] = JSON.parse(fromCache);
      return this.getPaginatedResponse(parsed, paginationData);
    }

    const collected: U[] = [];
    let swapiResult: SwapiPagination<U> | null = null;
    let nextPage: number | null = null;

    do {
      swapiResult = await this.swapiClient.handleRequest<SwapiPagination<U>>(resource, null, nextPage);
      collected.push(...(swapiResult?.results ?? []));

      nextPage = swapiResult?.next ? Number(swapiResult.next.match(/\d/g)?.[0]) : null;
    } while (nextPage !== null);

    await this.redis.set(key, JSON.stringify(collected), 'EX', SwapiService.Request_TTL);

    return this.getPaginatedResponse(collected, paginationData);
  }

  /**
   * Counts up all words from movies crawl property and returns word paired with their number of occurrences
   */
  public async getUniqueWordsFromFilms(): Promise<Array<[String, Number]>> {
    const moviesPaginated: Paginated<FilmsDto> = await this.getAll(SwapiResources.FILMS, { disablePagination: true });
    const movies = moviesPaginated.items;

    const words = _.words(this.getSanitizedMoviesDescription(movies)).map((w) => w.toLowerCase());
    const wordCount = _.countBy(words);

    return Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
  }

  public async getMostMentionedCharacters(): Promise<Array<String>> {
    const peoplePaginated = await this.getAll(SwapiResources.PEOPLE, { disablePagination: true });
    const moviesPaginated = await this.getAll(SwapiResources.FILMS, { disablePagination: true });

    const combinedDescription = this.getSanitizedMoviesDescription(moviesPaginated.items);

    const nameCount = new Map<string, number>();

    peoplePaginated.items.forEach((person) => {
      const regex = new RegExp(`\\b${person.name}\\b`, 'gi');
      const occurrences = (combinedDescription.match(regex) || []).length;
      nameCount.set(person.name, occurrences);
    });

    const maxOccurrences = Math.max(...nameCount.values());
    return [...nameCount.entries()]
      .filter(([, occurrences]) => occurrences === maxOccurrences)
      .map(([name, _]) => name);
  }

  /**
   * Returns single resource
   * @param resource - name of the resource to search for
   * @param id - id of a resource
   */
  public async getOne<T extends SwapiResources, U extends EndpointToClassMap[T]>(resource: T, id: number): Promise<U> {
    const key = this.getCacheKey(resource, id);
    const fromCache: string = await this.redis.get(key);
    if (fromCache) {
      return JSON.parse(fromCache) as U;
    }

    const swapiResult = await this.swapiClient.handleRequest<U>(resource, id);
    await this.redis.set(key, JSON.stringify(swapiResult), 'EX', SwapiService.Request_TTL);

    return swapiResult;
  }

  /**
   * Joins and Sanitizes movie crawl descriptions for further analysis
   * @param films - array of movies
   * @private
   */
  private getSanitizedMoviesDescription(films: FilmsDto[]): string {
    const combinedDescription = films.map((movie) => movie.opening_crawl).join(' ');
    return _.replace(combinedDescription, /[.,\/#!$%\^&\*;:{}=\-_`~()\r\n]/g, '');
  }

  /**
   * Wrapper for pagination
   * @param data - array of items to paginate
   * @param paginationData - pagination data input parameters
   * @private
   */
  private getPaginatedResponse<U>(data: U[], paginationData: GetAllInputDto): Paginated<U> {
    return paginationData?.disablePagination
      ? new Paginated<U>(data, data.length, data.length, 1)
      : Paginated.fromArray(data, paginationData?.perPage, paginationData?.currentPage);
  }

  /**
   * Return cache key for resource(s)
   * @param resource
   * @param id
   * @private
   */
  private getCacheKey(resource: SwapiResources, id?: number) {
    return `resources/${resource}${id ? `/${id}` : ''}`;
  }
}
