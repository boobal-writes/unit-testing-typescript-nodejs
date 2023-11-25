import type { Config } from "@jest/types";

const srcDir = "<rootDir>/src/app";
const testDir = "<rootDir>/src/testIntegration";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${srcDir}/**/*.ts`],
  testMatch: [`${testDir}/**/*.test.ts`],
};

export default config;
