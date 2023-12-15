import { Injectable } from '@nestjs/common';
import { NodeEnv } from './project.env';
import { BaseConfig } from '../../base.config';
import { ConfigService } from '../../config.service';

@Injectable()
export class ProjectConfig extends BaseConfig<'PROJECT'> {
  constructor(configService?: ConfigService) {
    super('PROJECT', configService ?? ConfigService.init(ProjectConfig));
  }

  get node_env() {
    return this.variables.NODE_ENV;
  }

  isDev() {
    return this.variables.NODE_ENV === NodeEnv.DEV;
  }

  isProd() {
    return this.variables.NODE_ENV === NodeEnv.PROD;
  }

  isLocal() {
    return !this.isProd();
  }
}
