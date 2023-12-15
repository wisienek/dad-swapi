import { ApiProperty } from '@nestjs/swagger';

/**
 * Pagination wrapper class
 * Takes as an input current array of items, total, numbers per page and current page.
 */
export class Paginated<T> {
  @ApiProperty({
    description: 'Current array of items (correct with pageNumber)',
  })
  items: T[];

  @ApiProperty({
    type: 'number',
    description: 'Number of total items to paginate',
    example: 354,
  })
  total: number;

  @ApiProperty({
    type: 'number',
    description: 'Number of items shown per page',
    example: 10,
  })
  perPage: number;

  @ApiProperty({
    type: 'number',
    description: 'Current page number. It will be calculeted on perPage basis.',
    example: 6,
  })
  currentPage: number;

  @ApiProperty({
    type: 'number',
    description: 'Calculated value representing number of available pages to iterate',
    example: 36,
  })
  totalPages: number;

  constructor(items: T[], total: number, perPage: number, currentPage: number) {
    this.items = items;
    this.total = total;
    this.perPage = Number(perPage);
    this.currentPage = Number(currentPage);
    this.totalPages = Math.ceil(total / perPage);
  }

  static fromArray<T>(wholeArray: T[], perPage = 10, currentPage = 1): Paginated<T> {
    const totalItems = wholeArray.length;
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, totalItems);

    const pageArray = wholeArray.slice(startIndex, endIndex);

    return new Paginated<T>(pageArray, totalItems, perPage, currentPage);
  }
}
