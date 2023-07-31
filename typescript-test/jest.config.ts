import type { Config } from "@jest/types";

const utilsDir = "<rootDir>/src/app";
const utilsTestDir = "<rootDir>/src/test";
const passwordCheckerDir = "<rootDir>/src/app/pass_checker";
const passwordCheckerTestDir = "<rootDir>/src/test/pass_checker";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${utilsDir}/**/*.ts`, `${passwordCheckerDir}/**/*.ts`],
  testMatch: [`${utilsTestDir}/**/*.ts`, `${passwordCheckerTestDir}/**/*.ts`],
};

export default config;
