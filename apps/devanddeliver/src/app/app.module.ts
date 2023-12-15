import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { SwapiModule } from '../swapi';

@Module({
  imports: [SwapiModule],
  controllers: [HealthcheckController],
})
export class AppModule {}
