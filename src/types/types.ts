import { AxiosInstance } from "axios";
import { Context, Response } from "koa";

export interface AppCtx {
  API: AxiosInstance;
  traced: any;
  log: any;
}

/**
 * Enhanced koa.Context by au_helpers
 */
export interface AuContext extends Context {
  response: {
    ok: any;
    forbidden: any;
    badRequest: any;
  } & Response;
}

export interface CreateIntentReq {
  amount: number;
  currency: string;
  description: string;
  customer: string | null;
  confirm: boolean;
  payment_method: string;
  return_url: string;
}

export interface CreateCustomerRequest {
  source: string;
  email: string;
  name: string;
}

export interface CreateDirectPaymentIntentReq {
  amount: number;
  currency: string;
  description: string;
  customer: string | null;
  confirm: boolean;
  return_url: string;
}