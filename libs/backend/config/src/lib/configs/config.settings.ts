import { ProjectConfig, ProjectEnv, RedisConfig, RedisEnv, ServerConfig, ServerEnv } from '@dad/config';
import { ClassConstructor } from 'class-transformer';
import { BaseConfig } from '../base.config';
import { ConfigSettings, ConfigType, getValidationFunction } from './config.types';

export type ConfigEnvs = {
  REDIS: RedisEnv;
  SERVER: ServerEnv;
  PROJECT: ProjectEnv;
};

export class ConfigSettingsClass {
  private settings: ConfigSettings = {
    REDIS: {
      fn: getValidationFunction(RedisEnv),
      configClass: RedisConfig,
    },
    SERVER: {
      fn: getValidationFunction(ServerEnv),
      configClass: ServerConfig,
    },
    PROJECT: {
      fn: getValidationFunction(ProjectEnv),
      configClass: ProjectConfig,
    },
  };

  public getSettings(config: ClassConstructor<BaseConfig<ConfigType>>) {
    for (const [key, value] of Object.entries(this.settings)) {
      if (value.configClass.name === config.name) {
        return { fn: value.fn, configType: key as ConfigType };
      }
    }
  }
}
