import { AnalyticsBrowser } from "@segment/analytics-next";
import { useMemo } from "react";

export const SSR = typeof window === "undefined";
export const IsCypress = !SSR && !!(window as any).Cypress; // https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress

class AnalyticsBrowserSingleton {
  private static instance: AnalyticsBrowser | null = null;

  public static getInstance(writeKey: string | undefined): AnalyticsBrowser {
    if (!this.instance) {
      if (!IsCypress && writeKey) {
        this.instance = AnalyticsBrowser.load(
          { writeKey },
          { initialPageview: true },
        );
      } else {
        console.warn(
          "Segment not initialized. No-op instance provided instead.",
        );
        this.instance = AnalyticsBrowser.load({ writeKey: "NOOP" });
      }
    }
    return this.instance;
  }
}

const useAnalyticsBrowser = () => {
  const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
  return useMemo(
    () => AnalyticsBrowserSingleton.getInstance(writeKey),
    [writeKey],
  );
};

export default useAnalyticsBrowser;
