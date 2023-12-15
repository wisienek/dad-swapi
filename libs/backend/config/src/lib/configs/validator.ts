import { validateSync } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

export const validate = <T extends object>(config: Record<string, unknown>, envClass: ClassConstructor<T>): T => {
  const validatedConfig: T = plainToClass(envClass, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });

  if (process.env.NODE_ENV === 'test') {
    return validatedConfig;
  }

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
