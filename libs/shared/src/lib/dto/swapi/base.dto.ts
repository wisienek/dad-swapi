import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export const urlOptions = {
  protocols: ['http', 'https'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
};

export class BaseDto {
  @ApiProperty({
    description: `When was the resource created`,
    example: '2000-07-26T00:00:01.967Z',
  })
  @IsDateString()
  @Expose()
  created: string;

  @ApiProperty({
    description: `When was the resource last edited`,
    example: '2000-07-26T00:00:01.967Z',
  })
  @IsDateString()
  @Expose()
  edited: string;

  @ApiProperty({
    description: `Url reference for this object`,
  })
  @IsUrl(urlOptions)
  @Expose()
  url: string;

  @ApiProperty({
    description: `Url references for species`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  species: string[];

  @ApiProperty({
    description: `Url references for starships`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  starships: string[];

  @ApiProperty({
    description: `Url references for planets`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  planets: string[];

  @ApiProperty({
    description: `Url references for films`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  films: string[];

  @ApiProperty({
    description: `Url references for vehicles`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  vehicles: string[];

  @ApiProperty({
    description: `Url references for characters`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  characters: string[];
}
