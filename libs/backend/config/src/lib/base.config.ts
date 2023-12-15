import { ConfigType, ConfigEnvClass } from './configs/config.types';
import { ConfigService } from './config.service';

export abstract class BaseConfig<TYPE extends ConfigType> {
  protected variables: ConfigEnvClass<TYPE>;

  protected constructor(configType: TYPE, protected configService: ConfigService) {
    this.variables = this.configService.get<TYPE, ConfigEnvClass<TYPE>>(configType);
    if (!this.configService.wasValidated(configType)) {
      throw new Error(`Config for ${configType} was not validated!`);
    }
  }
}
