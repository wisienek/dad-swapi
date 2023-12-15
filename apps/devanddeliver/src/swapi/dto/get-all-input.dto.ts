import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { IsBooleanString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Paginated } from '@dad/shared';

export class GetAllInputDto extends PartialType(PickType(Paginated, ['currentPage', 'perPage'])) {
  @ApiPropertyOptional({
    description: 'Check this to true if should return items without pagination limits',
    examples: [true, false],
    default: false,
  })
  @IsOptional()
  @IsBooleanString()
  @Type(() => Boolean)
  disablePagination?: boolean;
}
