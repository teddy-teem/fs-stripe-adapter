import * as bunyan from "bunyan";
import { loggerName, logLevel } from "./variables";

export const logger = bunyan.createLogger({
  name: loggerName,
  streams: [
    {
      type: "stream",
      stream: process.stdout,
      level: <bunyan.LogLevel>logLevel,
    },
  ],
});
