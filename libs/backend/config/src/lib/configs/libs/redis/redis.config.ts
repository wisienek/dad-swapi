import { Injectable } from '@nestjs/common';
import { BaseConfig } from '../../../base.config';
import { ConfigService } from '../../../config.service';

@Injectable()
export class RedisConfig extends BaseConfig<'REDIS'> {
  constructor(configService?: ConfigService) {
    super('REDIS', configService ?? ConfigService.init(RedisConfig));
  }

  get host(): string {
    return this.variables.REDIS_HOST || 'rediss://localhost';
  }

  get port(): number {
    return this.variables.REDIS_PORT || 6379;
  }

  get ttl(): number {
    return this.variables.REDIS_DEFAULT_TTL;
  }
}
