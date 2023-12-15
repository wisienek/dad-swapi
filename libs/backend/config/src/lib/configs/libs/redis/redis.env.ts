import { IsNumber, IsUrl } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { validateUtil } from '../../../validate.util';

export class _RedisEnv {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Expose()
  REDIS_PORT: number;

  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  @Expose()
  REDIS_HOST: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Expose()
  REDIS_DEFAULT_TTL: number = 60 * 60 * 24;
}

export const RedisEnv = registerAs('redis', () => validateUtil(process.env, _RedisEnv));
