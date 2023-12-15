import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SwapiPagination<T> {
  @ApiProperty({
    description: 'All results count',
  })
  count: number;

  @ApiPropertyOptional({
    description: 'Next result url',
  })
  next?: string;

  @ApiPropertyOptional({
    description: 'Previous result url',
  })
  previous?: string;

  @ApiProperty({
    description: 'Results array',
  })
  results: T[];
}
