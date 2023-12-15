import { IsNumber, IsUrl } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { validateUtil } from '../../../validate.util';

export class _ServerEnv {
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

export const ServerEnv = registerAs('api', () => validateUtil(process.env, _ServerEnv));
