import { NotFoundException } from '@nestjs/common';

export class SwapiNotFoundException extends NotFoundException {
  constructor(resource: string, id?: number) {
    super(`SWAPI returned not found on ${resource}${id ? `/${id}` : ''}`);
  }
}
