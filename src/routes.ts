import { Middleware } from "koa";
import * as Router from "koa-router";
import { healthCheck } from "./controllers/health";
import {
  createIntentClient,
  createIntentDirect,
  getCardDetailsByTokenId,
  getCardsByCustomerId,
  getCustomers,
  createCustomer,
  addCardByCustomerId
} from "./controllers/stripes";
// import * as stripeController from "./controllers/stripes"
const router = new Router();

router
  .get("/health", healthCheck as Middleware)
  .post("/create-intent/client", createIntentClient as Middleware)
  .post("/create-intent/direct", createIntentDirect as Middleware)
  .post("/create-customer", createCustomer as Middleware)
  .get("/card-details/:tokenId", getCardDetailsByTokenId as Middleware)
  .get("/customer/card-details/:customerId", getCardsByCustomerId as Middleware)
  .get("/customers", getCustomers as Middleware)
  .post("/add-card/:customerId", addCardByCustomerId as Middleware);

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();