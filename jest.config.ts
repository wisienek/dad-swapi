const { getJestProjects } = require('@nx/jest');

export default {
  projects: [...getJestProjects()],
  resolver: '@nx/jest/plugins/resolver',
  collectCoverage: true,
};
