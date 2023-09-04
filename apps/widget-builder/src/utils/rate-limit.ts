import { LRUCache } from "lru-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage,
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
}

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
