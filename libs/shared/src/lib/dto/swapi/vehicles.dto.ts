import { IsNumberString, IsString, IsUrl } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDto, urlOptions } from './base.dto';

export class VehiclesDto extends PickType(BaseDto, ['created', 'url', 'edited', 'films']) {
  @ApiProperty({
    description: `The maximum number of kilograms that this starship can transport`,
  })
  @IsString()
  @Expose()
  cargo_capacity: string;

  @ApiProperty({
    description: `The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.`,
  })
  @IsString()
  @Expose()
  consumables: string;

  @ApiProperty({
    description: `The cost of this starship new, in galactic credits.`,
  })
  @IsNumberString()
  @Type(() => Number)
  @Expose()
  cost_in_credits: string;

  @ApiProperty({
    description: `The number of personnel needed to run or pilot this starship.`,
  })
  @IsNumberString()
  @Type(() => Number)
  @Expose()
  crew: string;

  @ApiProperty({
    description: `The length of this starship in meters.`,
    example: '120000',
  })
  @IsNumberString()
  @Expose()
  length: string;

  @ApiProperty({
    description: `The manufacturer of this starship. Comma separated if more than one.`,
  })
  @IsString()
  @Expose()
  manufacturer: string;

  @ApiProperty({
    description: `The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.`,
  })
  @IsString()
  @Expose()
  max_atmosphering_speed: string;

  @ApiProperty({
    description: `The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".`,
  })
  @IsString()
  @Expose()
  model: string;

  @ApiProperty({
    description: `The name of this starship. The common name, such as "Death Star".`,
    example: 'Death Star',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: `The class of this vehicle`,
    example: 'wheeled',
  })
  @IsString()
  @Expose()
  vehicle_class: string;

  @ApiProperty({
    description: `An array of People URL Resources that this starship has been piloted by.`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  pilots: string[];
}
