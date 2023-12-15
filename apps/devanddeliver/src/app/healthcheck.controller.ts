import { Controller, Get } from '@nestjs/common';

/**
 * Healthcheck controller for deployment on cloud - check this every X seconds to see if api is alive
 */
@Controller('health')
export class HealthcheckController {
  @Get()
  healthcheck() {
    return { ok: true };
  }
}
