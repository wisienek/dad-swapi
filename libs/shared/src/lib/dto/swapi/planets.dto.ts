import { BaseDto, urlOptions } from './base.dto';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumberString, IsString, IsUrl, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class PlanetsDto extends PickType(BaseDto, ['url', 'films', 'created', 'edited']) {
  @ApiProperty({
    description: `The climate of this planet. Comma separated if diverse.`,
    example: 'Arid',
  })
  @IsString()
  @Expose()
  climate: string;

  @ApiProperty({
    description: `The diameter of this planet in kilometers.`,
    example: '10465',
  })
  @IsNumberString()
  @Expose()
  diameter: string;

  @ApiProperty({
    description: ` A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.`,
    example: '1',
  })
  @IsNumberString()
  @Expose()
  gravity: string;

  @ApiProperty({
    description: `The name of this planet.`,
    example: 'Tatooine',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: `The number of standard days it takes for this planet to complete a single orbit of its local star.`,
    example: '304',
  })
  @IsNumberString()
  @Expose()
  orbital_period: string;

  @ApiProperty({
    description: `The average population of sentient beings inhabiting this planet.`,
    example: '120000',
  })
  @IsNumberString()
  @Expose()
  population: string;

  @ApiProperty({
    description: `The number of standard hours it takes for this planet to complete a single rotation on its axis.`,
    example: '23',
  })
  @IsNumberString()
  @Expose()
  rotation_period: string;

  @ApiProperty({
    description: ` The percentage of the planet surface that is naturally occurring water or bodies of water.`,
    example: '23',
  })
  @IsNumberString()
  @Min(0)
  @Max(100)
  @Expose()
  surface_water: string;

  @ApiProperty({
    description: `The terrain of this planet. Comma separated if diverse.`,
    example: 'Dessert',
  })
  @IsString()
  @Expose()
  terrain: string;

  @ApiProperty({
    description: `Url references for residents (people)`,
  })
  @IsUrl(urlOptions, { each: true })
  @Expose()
  residents: string[];
}
