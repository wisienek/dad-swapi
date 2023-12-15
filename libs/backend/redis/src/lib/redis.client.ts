import Redis, { Redis as RedisIO } from 'ioredis';
import { Logger } from '@nestjs/common';
import { RedisConfig } from '@dad/config';

export type RedisClient = RedisIO;

export async function getRedisClient(redisConfig: RedisConfig): Promise<RedisClient> {
  const logger = new Logger('RedisClient');

  if (!redisConfig) {
    redisConfig = new RedisConfig();
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
