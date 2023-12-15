import { Injectable } from '@nestjs/common';
import { ConfigEnvClass, ConfigType, EnvVars } from './configs/config.types';
import { ConfigEnvs, ConfigSettingsClass } from './configs/config.settings';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type';
import { BaseConfig } from './base.config';
import 'dotenv/config';

@Injectable()
export class ConfigService {
  private cachedConfigs: Map<string, any> = new Map();

  private validatedEnv: Map<ConfigType, { [key: string]: any }> = new Map<ConfigType, { [key: string]: any }>();

  private static configSettingsMap: ConfigSettingsClass;

  private constructor() {}

  public static init(...configs: ClassConstructor<BaseConfig<ConfigType>>[]): ConfigService {
    const configService = new ConfigService();
    this.configSettingsMap = new ConfigSettingsClass();
    const config: Record<string, unknown> = {
      ...process.env,
    };
    for (const configType of configs) {
      const configSettings = this.getSettings(configType);
      if (!configSettings) {
        throw new Error('Undefined validation function');
      }
      const validated = configSettings.fn(config);
      configService.validatedEnv.set(configSettings.configType, validated);
    }
    return configService;
  }

  public getConfigFor(configClass: ClassConstructor<BaseConfig<ConfigType>>): BaseConfig<ConfigType> {
    return this.getOrCreate(configClass);
  }

  private static getSettings(configClass: ClassConstructor<BaseConfig<ConfigType>>): {
    fn: (config: EnvVars) => ConfigEnvs[ConfigType];
    configType: ConfigType;
  } {
    return this.configSettingsMap.getSettings(configClass);
  }

  private getOrCreate<T>(configClass: ClassConstructor<T>): T {
    if (!this.cachedConfigs.has(configClass.name)) {
      this.cachedConfigs.set(configClass.name, new configClass(this));
    }
    return this.cachedConfigs.get(configClass.name) as T;
  }

  public get<T extends ConfigType, C extends ConfigEnvClass<T>>(type: T): C {
    return this.validatedEnv.get(type) as C;
  }

  public wasValidated(configType: ConfigType): boolean {
    return this.validatedEnv.has(configType);
  }
}
