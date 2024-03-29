import { FilmsDto, PeopleDto } from '@dad/shared';

export const film: FilmsDto = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl:
    "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  characters: [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/people/2/',
    'https://swapi.dev/api/people/3/',
    'https://swapi.dev/api/people/4/',
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/6/',
    'https://swapi.dev/api/people/7/',
    'https://swapi.dev/api/people/8/',
    'https://swapi.dev/api/people/9/',
    'https://swapi.dev/api/people/10/',
    'https://swapi.dev/api/people/12/',
    'https://swapi.dev/api/people/13/',
    'https://swapi.dev/api/people/14/',
    'https://swapi.dev/api/people/15/',
    'https://swapi.dev/api/people/16/',
    'https://swapi.dev/api/people/18/',
    'https://swapi.dev/api/people/19/',
    'https://swapi.dev/api/people/81/',
  ],
  planets: ['https://swapi.dev/api/planets/1/', 'https://swapi.dev/api/planets/2/', 'https://swapi.dev/api/planets/3/'],
  starships: [
    'https://swapi.dev/api/starships/2/',
    'https://swapi.dev/api/starships/3/',
    'https://swapi.dev/api/starships/5/',
    'https://swapi.dev/api/starships/9/',
    'https://swapi.dev/api/starships/10/',
    'https://swapi.dev/api/starships/11/',
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/13/',
  ],
  vehicles: [
    'https://swapi.dev/api/vehicles/4/',
    'https://swapi.dev/api/vehicles/6/',
    'https://swapi.dev/api/vehicles/7/',
    'https://swapi.dev/api/vehicles/8/',
  ],
  species: [
    'https://swapi.dev/api/species/1/',
    'https://swapi.dev/api/species/2/',
    'https://swapi.dev/api/species/3/',
    'https://swapi.dev/api/species/4/',
    'https://swapi.dev/api/species/5/',
  ],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.dev/api/films/1/',
};

export const people: PeopleDto[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    species: [],
    vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
    starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'C-3PO',
    height: '167',
    mass: '75',
    hair_color: 'n/a',
    skin_color: 'gold',
    eye_color: 'yellow',
    birth_year: '112BBY',
    gender: 'n/a',
    homeworld: 'https://swapi.dev/api/planets/1/',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/4/',
      'https://swapi.dev/api/films/5/',
      'https://swapi.dev/api/films/6/',
    ],
    species: ['https://swapi.dev/api/species/2/'],
    vehicles: [],
    starships: [],
    created: '2014-12-10T15:10:51.357000Z',
    edited: '2014-12-20T21:17:50.309000Z',
    url: 'https://swapi.dev/api/people/2/',
  },
];

export const filmWords = [
  ['the', 5],
  ['empire', 3],
  ['to', 3],
  ['a', 2],
  ['of', 2],
  ['an', 2],
  ['it', 1],
  ['is', 1],
  ['period', 1],
  ['civil', 1],
  ['war', 1],
  ['rebel', 1],
  ['spaceships', 1],
  ['strikingfrom', 1],
  ['hidden', 1],
  ['base', 1],
  ['have', 1],
  ['wontheir', 1],
  ['first', 1],
  ['victory', 1],
  ['againstthe', 1],
  ['evil', 1],
  ['galactic', 1],
  ['during', 1],
  ['battle', 1],
  ['rebelspies', 1],
  ['managed', 1],
  ['steal', 1],
  ['secretplans', 1],
  ['sultimate', 1],
  ['weapon', 1],
  ['deathstar', 1],
  ['armored', 1],
  ['spacestation', 1],
  ['with', 1],
  ['enough', 1],
  ['powerto', 1],
  ['destroy', 1],
  ['entire', 1],
  ['planet', 1],
  ['pursued', 1],
  ['by', 1],
  ['ssinister', 1],
  ['agents', 1],
  ['princess', 1],
  ['leia', 1],
  ['races', 1],
  ['home', 1],
  ['aboard', 1],
  ['herstarship', 1],
  ['custodian', 1],
  ['thestolen', 1],
  ['plans', 1],
  ['that', 1],
  ['can', 1],
  ['save', 1],
  ['herpeople', 1],
  ['and', 1],
  ['restorefreedom', 1],
  ['galaxy', 1],
];
