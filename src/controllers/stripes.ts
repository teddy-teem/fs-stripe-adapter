import { errorResponseHandler as errorHandler, validate } from "au-helpers";
import { AuContext } from "../types/types";
import {
  CreateIntent,
  GetCardDetailsByTokenId,
  GetCardsByCustomerId,
  GetCustomers,
  CreateCustomer,
  AddCardByCustomerId,
} from "../models/Stripe";

export const createIntentDirect = async (ctx: AuContext): Promise<void> => {
  console.log("=================Direct Payment=================")
  try {
    const {
      amount,
      currency,
      customer,
      peymentMethod,
    } = ctx.request.body;
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 23 >> ctx.request.body`, ctx.request.body)
    const res = await CreateIntent(ctx.appCtx, {
      amount,
      currency,
      customer,
      confirm: true,
      payment_method: peymentMethod,
      off_session: true,
    });
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 32 >> res`, res)
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const createIntentClient = async (ctx: AuContext): Promise<void> => {
  try {
    const {
      amount,
      currency,
      customer,
      confirm=true,
      payment_method,
      paymentType="client"
    } = ctx.request.body;
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 23 >> ctx.request.body`, ctx.request.body)
    const res = await CreateIntent(ctx.appCtx, {
      amount,
      currency,
      customer,
      confirm: true,
      setup_future_usage: 'off_session',
      // automatic_payment_methods: JSON.stringify({
      //   enabled: true,
      // }),
    });
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 32 >> res`, res)
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const createCustomer = async (ctx: AuContext): Promise<void> => {
  try {
    const { source, name, email } = ctx.request.body;
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 41 >>  source, name, email }`, { source, name, email })
    const res = await CreateCustomer(ctx.appCtx, { source, name, email });
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 45 >> res`, res)
    ctx.response.ok(res, "Success from adapter");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const addCardByCustomerId = async (ctx: AuContext): Promise<void> => {
  try {
    const { source } = ctx.request.body;
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 50 >> source`, source)
    const {customerId} = ctx.params;
    const res = await AddCardByCustomerId(ctx.appCtx, customerId, { source });
    console.log(`\x1b[44m=========>\x1b[0m >> file: stripes.ts >> line 53 >> res`, res)
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const getCardsByCustomerId = async (ctx: AuContext): Promise<void> => {
  const { customerId } = ctx.params;
  try {
    const res = await GetCardsByCustomerId(ctx.appCtx, customerId);
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const getCardDetailsByTokenId = async (
  ctx: AuContext,
): Promise<void> => {
  const { tokenId } = ctx.params;
  try {
    const res = await GetCardDetailsByTokenId(ctx.appCtx, tokenId);
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

export const getCustomers = async (ctx: AuContext): Promise<void> => {
  try {
    const res = await GetCustomers(ctx.appCtx);
    ctx.response.ok(res, "Success");
  } catch (e) {
    errorHandler(ctx, e);
  }
};

