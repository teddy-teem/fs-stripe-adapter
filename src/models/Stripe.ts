import {
  AppCtx,
  CreateIntentReq,
  CreateCustomerRequest,
  CreateDirectPaymentIntentReq,
} from "../types/types";
import { stripeApiUrl, stripeApiKey } from "../config/variables";
const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${stripeApiKey}`,
  },
};

export const CreateIntent = async (appCtx: AppCtx, body: any): Promise<any> => {
  console.log("===========Stripe Model=================");

  console.log(
    `\x1b[44m=========>\x1b[0m >> file: Stripe.ts >> line 19 >> body`,
    body,
  );
  const result = await appCtx.API.post(
    `${stripeApiUrl}/payment_intents`,
    new URLSearchParams(Object.entries(body)).toString(),
    config,
  )
    .then(res => res.data)
    .catch(e => e.response);
  return result;
};

export const CreateCustomer = async (
  appCtx: AppCtx,
  body: CreateCustomerRequest,
): Promise<any> => {
  const res = await appCtx.API.post(
    `${stripeApiUrl}/customers`,
    new URLSearchParams(Object.entries(body)).toString(),
    config,
  )
    .then(res => res.data)
    .catch(e => e.response);
  return res;
};

export const GetCardsByCustomerId = async (
  appCtx: AppCtx,
  customerId: string,
): Promise<any> => {
  const res = await appCtx.API.get(
    `${stripeApiUrl}/customers/${customerId}/sources?object=card`,
    config,
  )
    .then(res => res.data)
    .catch(e => e.response);
  return res;
};

export const AddCardByCustomerId = async (
  appCtx: AppCtx,
  customerId: string,
  body: any,
): Promise<any> => {
  console.log(
    `\x1b[44m=========>\x1b[0m >> file: Stripe.ts >> line 54 >> body`,
    body,
  );
  console.log(
    `\x1b[44m=========>\x1b[0m >> file: Stripe.ts >> line 54 >> customerId`,
    customerId,
  );
  console.log(
    `\x1b[44m=========>\x1b[0m >> file: Stripe.ts >> line 54 >> body`,
    `${stripeApiUrl}/customers/${customerId}/sources`,
  );
  const res = await appCtx.API.post(
    `${stripeApiUrl}/customers/${customerId}/sources`,
    new URLSearchParams(Object.entries(body)).toString(),
    config,
  )
    .then(res => res.data)
    .catch(e => e.response);
  return res;
};

export const GetCardDetailsByTokenId = async (
  appCtx: AppCtx,
  tokenId: string,
): Promise<any> => {
  const res = await appCtx.API.get(`${stripeApiUrl}/tokens/${tokenId}`, config)
    .then(res => res.data)
    .catch(e => e.response);
  return res;
};

export const GetCustomers = async (appCtx: AppCtx): Promise<any> => {
  const res = await appCtx.API.get(`${stripeApiUrl}/customers`, config)
    .then(res => res.data)
    .catch(e => e.response);
  return res;
};
