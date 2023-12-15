import { FilmsDto, PeopleDto, PlanetsDto, SpeciesDto, StarshipsDto, VehiclesDto } from '../dto';
import { SwapiResources } from './resources.enum';

/**
 * Map for endpoint class validation
 */
export const EndpointToClassMap = {
  [SwapiResources.PEOPLE]: PeopleDto,
  [SwapiResources.FILMS]: FilmsDto,
  [SwapiResources.STARSHIPS]: StarshipsDto,
  [SwapiResources.PLANETS]: PlanetsDto,
  [SwapiResources.SPECIES]: SpeciesDto,
  [SwapiResources.VEHICLES]: VehiclesDto,
} as const;

export type EndpointToClassType = typeof EndpointToClassMap;
