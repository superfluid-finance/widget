import { useMemo } from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";

export const SSR = typeof window === "undefined";
export const IsCypress = !SSR && !!(window as any).Cypress; // https://docs.cypress.io/faq/questions/using-cypress-faq#Is-there-any-way-to-detect-if-my-app-is-running-under-Cypress

const useAnalyticsBrowser = () =>
  useMemo(() => {
    const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;
    if (!IsCypress && writeKey) {
      return AnalyticsBrowser.load(
        { writeKey },
        {
          initialPageview: true,
        }
      );
    } else {
      console.warn("Segment not initialized. No-op instance provided instead.");
      return AnalyticsBrowser.load({ writeKey: "NOOP" });
    }
  }, []);

export default useAnalyticsBrowser;
