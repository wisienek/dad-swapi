import { Inject, Injectable } from '@nestjs/common';
import { _ServerEnv, ServerEnv } from './server.env';
import { BaseConfig } from '../../../base.config';

@Injectable()
export class ServerConfig extends BaseConfig {
  constructor(
    @Inject(ServerEnv.KEY)
    protected env: _ServerEnv
  ) {
    super();
  }

  get port(): number {
    return this.env.APP_PORT;
  }

  get swapiBaseUrl(): string {
    return this.env.SWAPI_SERVER_BASE_URL;
  }
}
