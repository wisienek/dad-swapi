import 'setimmediate';
import Redis, { Redis as RedisIO } from 'ioredis';
import { Logger } from '@nestjs/common';
import { getStaticConfig, RedisConfig } from '@dad/config';

export type RedisClient = RedisIO;

export async function getRedisClient(
  redisConfig: RedisConfig,
  logger: Logger = new Logger('RedisClient')
): Promise<RedisClient> {
  if (!redisConfig) {
    redisConfig = getStaticConfig(RedisConfig);
  }

  return new Promise((resolve, reject) => {
    logger.log(`Creating Redis client (${redisConfig.host}:${redisConfig.port})...`);

    const redisClient = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
    });

    redisClient.on('connect', () => {
      logger.log('Client connected...');
    });

    redisClient.on('ready', () => {
      logger.log('Client ready!');
      resolve(redisClient);
    });

    redisClient.on('reconnecting', (e: any) => {
      logger.warn(`Reconnecting: ${e}`);
    });

    redisClient.on('error', (e) => {
      logger.error(e);
      reject(e);
    });
  });
}
