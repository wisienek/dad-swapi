import { IsNumberString, IsString, MinLength } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { Expose } from 'class-transformer';

export class PeopleDto extends OmitType(BaseDto, ['characters', 'planets']) {
  @ApiProperty({
    description: `Character's birth year with era annotation`,
    examples: ['99 BE', '102 BYE'],
  })
  @IsString()
  @Expose()
  birth_year: string;

  @ApiProperty({
    description: `Character's eye colour`,
    examples: ['blue', 'green', 'brown'],
  })
  @IsString()
  @Expose()
  eye_color: string;

  @ApiProperty({
    description: `Character's gender`,
    examples: ['Male', 'Female', 'War helicopter'],
  })
  @IsString()
  @Expose()
  gender: string;

  @ApiProperty({
    description: `Character's height in metric`,
  })
  @IsNumberString({ no_symbols: true })
  @Expose()
  height: string;

  @ApiProperty({
    description: `Character's homeworld planet`,
  })
  @IsString()
  @Expose()
  homeworld: string;

  @ApiProperty({
    description: `How much does the character weigh`,
  })
  @IsString()
  @Expose()
  mass: string;

  @ApiProperty({
    description: `Character's name`,
  })
  @MinLength(3)
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: `The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.`,
  })
  @IsString()
  @Expose()
  hair_color: string;

  @ApiProperty({
    description: `The skin color of this person.`,
  })
  @IsString()
  @Expose()
  skin_color: string;
}
