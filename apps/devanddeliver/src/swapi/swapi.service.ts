import { Inject, Injectable } from '@nestjs/common';
import { EndpointToClassType, Paginated, SwapiResources } from '@dad/shared';
import { SwapiClient } from './swapi.client';
import { GetAllInputDto } from './dto';
import { REDIS, RedisClient } from '@dad/redis';

@Injectable()
export class SwapiService {
  private static Request_TTL = 60 * 60 * 24;

  constructor(@Inject(REDIS) private redis: RedisClient, private swapiClient: SwapiClient) {}

  /**
   * Returns all found resources
   * @param resource - name of the resource to search for
   * @param paginationData - optional options for pagination
   */
  public async getAll<T extends SwapiResources, U extends EndpointToClassType[T]>(
    resource: T,
    paginationData: GetAllInputDto
  ): Promise<Paginated<U>> {
    const key = this.getCacheKey(resource);
    const fromCache: string = await this.redis.get(key);

    if (fromCache) {
      const parsed: U[] = JSON.parse(fromCache);
      return this.getPaginatedResponse(parsed, paginationData);
    }

    const swapiResult = await this.swapiClient.handleRequest<Array<U>>(resource);
    await this.redis.set(key, JSON.stringify(swapiResult), 'EX', SwapiService.Request_TTL);

    return this.getPaginatedResponse(swapiResult, paginationData);
  }

  /**
   * Returns single resource
   * @param resource - name of the resource to search for
   * @param id - id of a resource
   */
  public async getOne<T extends SwapiResources, U extends EndpointToClassType[T]>(resource: T, id: number): Promise<U> {
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
