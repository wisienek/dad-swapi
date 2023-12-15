import { BaseDto, urlOptions } from './base.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumberString, IsString, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class SpeciesDto extends PickType(BaseDto, ['created', 'edited', 'films', 'url']) {
  @ApiProperty({
    description: `The average height of this species in centimeters.`,
    example: '2.1',
  })
  @IsNumberString()
  @Expose()
  average_height: string;

  @ApiProperty({
    description: `The average lifespan of this species in years.`,
    example: '400',
  })
  @IsNumberString()
  @Expose()
  average_lifespan: string;

  @ApiProperty({
    description: `The classification of this species, such as "mammal" or "reptile".`,
    example: 'Mammal',
  })
  @IsString()
  @Expose()
  classification: string;

  @ApiProperty({
    description: `The designation of this species, such as "sentient".`,
    example: 'Sentient',
  })
  @IsString()
  @Expose()
  designation: string;

  @ApiProperty({
    description: `A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.`,
    example: 'blue, green, yellow, brown, golden, red',
  })
  @IsString()
  @Expose()
  eye_colors: string;

  @ApiProperty({
    description: `A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.`,
    example: 'black, brown',
  })
  @IsString()
  @Expose()
  hair_colors: string;

  @ApiProperty({
    description: `The language commonly spoken by this species.`,
    example: 'Shyriiwook',
  })
  @IsString()
  @Expose()
  language: string;

  @ApiProperty({
    description: `The name of this species.`,
    example: 'Wookie',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: `The URL of a planet resource, a planet that this species originates from.`,
    example: 'https://swapi.dev/api/planets/14/',
  })
  @IsString()
  @Expose()
  homeworld: string;

  @ApiProperty({
    description: `An array of People URL Resources that are a part of this species.`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  people: string[];
}
