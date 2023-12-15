import { Injectable } from '@nestjs/common';
import { BaseConfig } from '../../../base.config';
import { ConfigService } from '../../../config.service';

@Injectable()
export class ServerConfig extends BaseConfig<'SERVER'> {
  constructor(configService?: ConfigService) {
    super('SERVER', configService ?? ConfigService.init(ServerConfig));
  }

  get port(): number {
    return this.variables.APP_PORT;
  }

  get swapiBaseUrl(): string {
    return this.variables.SWAPI_SERVER_BASE_URL;
  }
}
