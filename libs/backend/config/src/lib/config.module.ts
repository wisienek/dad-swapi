import { DynamicModule, Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassConstructor } from 'class-transformer';
import { BaseConfig } from './base.config';
import { ConfigType } from './configs/config.types';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModuleInternal {
  static forConfigs(configs: ClassConstructor<BaseConfig<ConfigType>>[]): DynamicModule {
    const logger = new Logger(ConfigModule.name);

    const providers: Provider[] = [
      {
        provide: ConfigService,
        useFactory() {
          const configService = ConfigService.init(...configs);
          configs.forEach((config) => logger.debug(`${config.name} was initialized`));
          return configService;
        },
      },
    ];

    for (const config of configs) {
      providers.push({
        provide: config,
        useFactory: (configService: ConfigService) => {
          return configService.getConfigFor(config);
        },
        inject: [ConfigService],
      });
    }

    return {
      module: ConfigModule,
      providers,
      exports: providers,
    };
  }
}
