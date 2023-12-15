import { Inject, Injectable } from '@nestjs/common';
import { _RedisEnv, RedisEnv } from './redis.env';
import { BaseConfig } from '../../../base.config';

@Injectable()
export class RedisConfig extends BaseConfig {
  constructor(
    @Inject(RedisEnv.KEY)
    protected env: _RedisEnv
  ) {
    super();
  }

  get host(): string {
    return this.env.REDIS_HOST;
  }

  get port(): number {
    return this.env.REDIS_PORT;
  }

  get ttl(): number {
    return this.env.REDIS_DEFAULT_TTL;
  }
}
