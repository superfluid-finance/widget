import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export const checkRateLimit = async (
  req: NextApiRequest,
  res: NextApiResponse,
  check: (res: NextApiResponse, limit: number, token: string) => Promise<void>,
) => {
  const clientIp = requestIp.getClientIp(req);

  if (clientIp) {
    await check(res, 3, clientIp);
  } else {
    throw new Error("Invalid client ip");
  }
};
