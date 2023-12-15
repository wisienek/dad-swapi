import { FilmsDto, PeopleDto, PlanetsDto, SpeciesDto, StarshipsDto, VehiclesDto } from '../dto';
import { SwapiResources } from './resources.enum';

/**
 * Map for endpoint class validation
 */
export type EndpointToClassMap = {
  [SwapiResources.PEOPLE]: PeopleDto;
  [SwapiResources.FILMS]: FilmsDto;
  [SwapiResources.STARSHIPS]: StarshipsDto;
  [SwapiResources.PLANETS]: PlanetsDto;
  [SwapiResources.SPECIES]: SpeciesDto;
  [SwapiResources.VEHICLES]: VehiclesDto;
};

export type EndpointClasses = EndpointToClassMap[keyof EndpointToClassMap];
