import { RequestTimeoutException } from '@nestjs/common';

export class SwapiTimeoutException extends RequestTimeoutException {
  constructor() {
    super(`Request for SWAPI timed out!`);
  }
}
