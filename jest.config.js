/** @type {import('jest').Config} */
module.exports = {
  // 👉 entorno con DOM para pruebas de componentes React
  testEnvironment: 'jsdom',

  // transforma JS/TS/TSX con babel-jest
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },

  // patrones de tests y exclusiones (igual que tenías)
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(test).[jt]s?(x)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/test-utils'
  ],

  // mocks de assets/yaml que usabas
  moduleNameMapper: {
    'i18n/(.*)\\.yml$': '<rootDir>/__tests__/test-utils/mock-data/empty-yml.js',
    'modeSettings.yml$': '<rootDir>/__tests__/test-utils/mock-data/empty-yml.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/test-utils/mock-data/fileMock.js'
  },

  setupFilesAfterEnv: [
    '@wordpress/jest-puppeteer-axe',
    '<rootDir>/__tests__/test-utils/setup-env.js'
  ],
  globalSetup: '<rootDir>/__tests__/test-utils/global-setup.js',

  // cobertura opcional
  collectCoverage: true,
  coverageDirectory: 'coverage'
};
