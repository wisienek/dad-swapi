import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export enum NodeEnv {
  PROD = 'production',
  DEV = 'development',
  TEST = 'test',
}

export class ProjectEnv {
  @IsString()
  @Expose()
  NODE_ENV = NodeEnv.DEV;
}
