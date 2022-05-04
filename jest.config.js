module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1'
  }
}
