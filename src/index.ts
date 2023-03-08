/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import * as Koa from "koa";
import * as koaBody from "koa-body";
import * as cors from "koa2-cors";
import { logger as loggerMiddleware, requestId, responseHandler, tracing, context } from "au-helpers";

import { appHost, appPort, serviceName, serviceDomain } from "./config/variables";
import { logger } from "./config/logger";
import { routes, allowedMethods } from "./routes";

const app = new Koa();

tracing.koaTracer(app, {
  serviceName,
  serviceDomain,
  logger,
});

app.use(requestId());
app.use(context.contextMiddleware());
app.use(koaBody());
app.use(tracing.tracingMiddleware());
app.use(tracing.axiosTracingMiddleware());
app.use(loggerMiddleware({ logger }));
app.use(responseHandler());
app.use(cors({ origin: "*" }));
app.use(routes);
app.use(allowedMethods);

const server = app
  .listen(appPort, appHost)
  .on("listening", async () => logger.info(`Server running on port ${appPort}`))
  .on("close", () => logger.info("on close"))
  .on("error", (err) => logger.error("on error", err));

// Expose server
module.exports = server;
