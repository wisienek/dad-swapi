import { IsNumberString, IsString } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { VehiclesDto } from './vehicles.dto';

export class StarshipsDto extends OmitType(VehiclesDto, ['vehicle_class']) {
  @ApiProperty({
    description: `The Maximum number of Megalights this starship can travel in a standard hour`,
  })
  @IsString()
  @Expose()
  MGLT: string;

  @ApiProperty({
    description: `The class of this starships hyperdrive.`,
    example: '4.0',
  })
  @IsNumberString()
  @Expose()
  hyperdrive_rating: string;

  @ApiProperty({
    description: `The number of non-essential people this starship can transport.`,
    example: '843342',
  })
  @IsNumberString()
  @Expose()
  passangers: string;

  @ApiProperty({
    description: `The class of this starship`,
    examples: ['Starfighter', 'Deep Space Mobile Battlestation'],
  })
  @IsString()
  @Expose()
  starship_class: string;
}
