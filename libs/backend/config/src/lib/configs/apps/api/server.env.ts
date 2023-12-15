import { IsNumber, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class ServerEnv {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Expose()
  APP_PORT: number;

  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  @Expose()
  SWAPI_SERVER_BASE_URL: string;
}
