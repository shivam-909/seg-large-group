/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  preset: "ts-jest/presets/default-esm",
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/"
  ],
  extensionsToTreatAsEsm: [
    ".ts"
  ],
  testTimeout: 20000

};