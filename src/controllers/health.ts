import { AuContext } from "../types/types";

export const healthCheck = async (ctx: AuContext): Promise<void> => {  
  ctx.response.ok({
    status: "ok",
  });
};
