// jest.config.ts
import * as path from "path";
import type { Config } from "@jest/types";
/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: path.resolve(`${__dirname}/.env.dev`) });
// Add missing env vars from '.env.dev' file, e.g.:
// process.env.AWS_REGION = "fake";

// Sync object
const config: Config.InitialOptions = {
  setupFiles: ["dotenv/config"],
  modulePathIgnorePatterns: [`${__dirname}/__tests__/mocks`, `${__dirname}/dist`],
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
export default config;
