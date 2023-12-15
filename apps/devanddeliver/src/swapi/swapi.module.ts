import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModuleInternal, ServerConfig } from '@dad/config';
import { SwapiRestController } from './swapi-rest.controller';
import { SwapiClient } from './swapi.client';

@Module({
  imports: [
    ConfigModuleInternal.forConfigs(ServerConfig),
    HttpModule.registerAsync({
      useFactory: (config: ServerConfig) => ({ baseURL: config.swapiBaseUrl }),
      inject: [ConfigModuleInternal.forConfigs(ServerConfig)],
    }),
  ],
  controllers: [SwapiRestController],
  providers: [SwapiClient],
})
export class SwapiModule {}
