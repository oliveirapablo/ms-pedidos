module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**>'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/src/main/server.ts',
    '!**/src/main/config/env.ts',
    '!**/src/main/adapters/request-items.ts',
    '!**/src/infra/db/mongodb/helpers/mongo-helper.ts',
    '!**/src/infra/topic/kafka/helpers/kafka-helper.ts',
    '!**/src/presentation/errors/*.ts',
    '!**/src/presentation/protocols/*.ts',
    '!**/src/presentation/controller/request-items/request-items-protocols.ts',
    '!**/src/data/usecases/add-request-items/db-add-request-items-protocols.ts',
],

  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
