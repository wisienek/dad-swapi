import { ConfigEnvs } from './config.settings';
import { ClassConstructor } from 'class-transformer';
import { validate } from './validator';
import { BaseConfig } from '../base.config';

export type ConfigType = keyof ConfigEnvs;
export type ConfigEnvClass<Type extends ConfigType> = ConfigEnvs[Type];

export type EnvVars = Record<string, unknown>;

export const getValidationFunction = <T extends object>(envClass: ClassConstructor<T>) => {
  return (config: EnvVars) => validate<T>(config, envClass);
};

export type ConfigSettings = {
  [CType in keyof ConfigEnvs]: {
    fn: (config: EnvVars) => ConfigEnvs[CType];
    configClass: ClassConstructor<BaseConfig<CType>>;
  };
};
