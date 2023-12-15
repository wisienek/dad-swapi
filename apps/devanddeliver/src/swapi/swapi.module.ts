import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModuleInternal, ServerConfig } from '@dad/config';
import { SwapiRestController } from './swapi-rest.controller';
import { SwapiClient } from './swapi.client';
import { SwapiService } from './swapi.service';
import { RedisModule } from '@dad/redis';

@Module({
  imports: [
    ConfigModuleInternal.forConfigs([ServerConfig]),
    HttpModule.registerAsync({
      imports: [ConfigModuleInternal.forConfigs([ServerConfig])],
      inject: [ServerConfig],
      useFactory: (config: ServerConfig) => ({ baseURL: config.swapiBaseUrl }),
    }),
    RedisModule,
  ],
  controllers: [SwapiRestController],
  providers: [SwapiClient, SwapiService],
})
export class SwapiModule {}
