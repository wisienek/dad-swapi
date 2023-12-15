import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, timeout } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { SwapiResources } from '@dad/shared';
import { SwapiTimeoutException, SwapiNotFoundException } from './errors';

@Injectable()
export class SwapiClient {
  private readonly logger = new Logger(SwapiClient.name);

  constructor(private httpService: HttpService) {}

  /**
   * Wrapper method for swapi calls
   * @param resource - which item to search for
   * @param id - for getting specific item
   * @param timeoutMs - time to timeout request
   */
  public async handleRequest<T>(resource: SwapiResources, id?: number, timeoutMs = 10000): Promise<T> {
    try {
      const res = await firstValueFrom(
        this.httpService
          .get<T>(`/${resource}${id ? `/${id}` : ''}`, {
            headers: {
              Accept: 'application/json',
            },
          })
          .pipe(timeout(timeoutMs))
      );
      return res.data;
    } catch (error) {
      this.logger.error(`Caught error on client: ${error}`);
      const status: number = (error as AxiosError)?.response?.status || 0;

      switch (status) {
        case 408:
        case 508:
          throw new SwapiTimeoutException();

        case 400:
          throw new SwapiNotFoundException(resource, id);
      }
    }
  }
}
