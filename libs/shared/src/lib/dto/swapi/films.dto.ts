import { BaseDto } from './base.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class FilmsDto extends OmitType(BaseDto, ['films']) {
  @ApiProperty({
    description: 'Who directed this movie',
  })
  @IsString()
  @Expose()
  director: string;

  @ApiProperty({
    description: 'List of producers divided by comma',
  })
  @IsString()
  @Expose()
  producer: string;

  @ApiProperty({
    description: 'Who directed this movie',
  })
  @IsNumber()
  @Expose()
  episode_id: number;

  @ApiProperty({
    description: `Short opening description for this film`,
  })
  @IsString()
  @Expose()
  opening_crawl: string;

  @ApiProperty({
    description: `Which year was the movie released`,
  })
  @IsDateString({ strict: true })
  @Expose()
  release_date: string;

  @ApiProperty({
    description: `Film title`,
  })
  @IsString()
  @Expose()
  title: string;
}
