import { IsNumber, IsString, NotEquals } from 'class-validator';
import { Expose } from 'class-transformer';

export class RedisEnv {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @Expose()
  REDIS_PORT: number;

  @IsString()
  @NotEquals('')
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
