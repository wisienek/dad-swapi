import { Test, TestingModule } from '@nestjs/testing';
import { SwapiService } from './swapi.service';
import { SwapiClient } from './swapi.client';
import { REDIS } from '@dad/redis';
import { FilmsDto, Paginated, SwapiResources } from '@dad/shared';
import { film, filmWords, people } from './data';
import { SwapiPagination } from './dto';

describe('SwapiService', () => {
  let service: SwapiService;

  const mockRedisClient = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockSwapiClient = {
    handleRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: REDIS,
          useValue: mockRedisClient,
        },
        { provide: SwapiClient, useValue: mockSwapiClient },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const filmsArray = [film];
  const filmsPaginated = Paginated.fromArray(filmsArray);

  describe('getAll', () => {
    it('should retrieve data from cache if available', async () => {
      mockRedisClient.get.mockResolvedValue(JSON.stringify(filmsArray));

      const result = await service.getAll(SwapiResources.FILMS, { disablePagination: false });

      expect(result).toEqual(filmsPaginated);
      expect(mockSwapiClient.handleRequest).not.toHaveBeenCalled();
      expect(mockRedisClient.get).toHaveBeenCalledWith('resources/films');
    });

    it('should fetch data from SwapiClient when not in cache', async () => {
      const swapiClientData: SwapiPagination<FilmsDto> = {
        count: 1,
        results: filmsArray,
      };

      mockRedisClient.get.mockResolvedValue(null);
      mockSwapiClient.handleRequest.mockResolvedValueOnce(swapiClientData);

      const result = await service.getAll(SwapiResources.FILMS, { disablePagination: false });

      expect(result).toEqual(filmsPaginated);
      expect(mockSwapiClient.handleRequest).toHaveBeenCalledWith(SwapiResources.FILMS);
      expect(mockRedisClient.set).toHaveBeenCalledWith(
        'resources/films',
        JSON.stringify(filmsPaginated.items),
        'EX',
        60 * 60 * 24
      );
    });

    it('should fetch data from SwapiClient and handle pagination when not in cache', async () => {
      const firstPage: SwapiPagination<FilmsDto> = {
        count: 2,
        next: 'https://swapi.com/api/films/?page=2',
        results: filmsArray,
      };

      const secondPage: SwapiPagination<FilmsDto> = {
        count: 2,
        results: filmsArray,
      };

      const collectedArray = [film, film];

      mockRedisClient.get.mockResolvedValue(null);
      mockSwapiClient.handleRequest.mockResolvedValueOnce(firstPage).mockResolvedValueOnce(secondPage);

      const result = await service.getAll(SwapiResources.FILMS, { disablePagination: false });

      expect(result).toEqual(Paginated.fromArray(collectedArray));
      expect(mockSwapiClient.handleRequest).toHaveBeenCalledWith(SwapiResources.FILMS, null, null);
      expect(mockSwapiClient.handleRequest).toHaveBeenNthCalledWith(2, SwapiResources.FILMS, null, 2);
      expect(mockRedisClient.set).toHaveBeenCalledWith(
        'resources/films',
        JSON.stringify(collectedArray),
        'EX',
        60 * 60 * 24
      );
    });
  });

  describe('getOne', () => {
    const filmId = 1;

    it('should get one film from cache', async () => {
      mockRedisClient.get.mockResolvedValue(JSON.stringify(film));

      const result = await service.getOne(SwapiResources.FILMS, filmId);

      expect(result).toEqual(film);
      expect(mockSwapiClient.handleRequest).not.toHaveBeenCalled();
      expect(mockRedisClient.get).toHaveBeenCalledWith(`resources/films/${filmId}`);
    });

    it('should get one film without cache', async () => {
      mockRedisClient.get.mockResolvedValue(null);
      mockSwapiClient.handleRequest.mockResolvedValueOnce(film);

      const result = await service.getOne(SwapiResources.FILMS, filmId);

      expect(result).toEqual(film);
      expect(mockSwapiClient.handleRequest).toHaveBeenCalledWith(SwapiResources.FILMS, filmId);
      expect(mockRedisClient.set).toHaveBeenCalledWith(
        `resources/films/${filmId}`,
        JSON.stringify(film),
        'EX',
        60 * 60 * 24
      );
    });
  });

  describe('unique words', () => {
    it('should return correct value', async () => {
      mockRedisClient.get.mockResolvedValue(JSON.stringify(filmsArray));

      const result = await service.getUniqueWordsFromFilms();

      expect(result).toEqual(filmWords);
      expect(mockSwapiClient.handleRequest).not.toHaveBeenCalled();
      expect(mockRedisClient.get).toHaveBeenCalledWith('resources/films');
    });
  });

  describe('most mentioned characters', () => {
    it('should return most mentioned characters', async () => {
      mockRedisClient.get
        .mockResolvedValueOnce(JSON.stringify(people))
        .mockResolvedValueOnce(JSON.stringify(filmsArray));

      const result = await service.getMostMentionedCharacters();

      expect(result).toEqual(people.map((p) => p.name));
      expect(mockSwapiClient.handleRequest).not.toHaveBeenCalled();
      expect(mockRedisClient.get).toHaveBeenCalledWith('resources/films');
      expect(mockRedisClient.get).toHaveBeenCalledWith('resources/people');
    });
  });
});
