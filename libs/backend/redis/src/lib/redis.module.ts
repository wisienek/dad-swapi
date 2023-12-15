import { Logger, Module, Provider } from '@nestjs/common';
import { ConfigModuleInternal, RedisConfig } from '@dad/config';
import { getRedisClient, RedisClient } from './redis.client';

export const REDIS = 'REDIS';

export const redisFactory: Provider<Promise<RedisClient>> = {
  provide: REDIS,
  useFactory: getRedisClient,
  inject: [RedisConfig, Logger],
};

@Module({
  imports: [ConfigModuleInternal.forConfigs(RedisConfig)],
  providers: [redisFactory],
  exports: [REDIS],
})
export class RedisModule {}
