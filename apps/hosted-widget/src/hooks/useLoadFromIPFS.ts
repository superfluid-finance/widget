import { ThemeOptions } from "@mui/material";
import { PaymentDetails, ProductDetails } from "@superfluid-finance/widget";
import { useEffect, useState } from "react";

const gateway = "https://cloudflare-ipfs.com";

const layoutTypes = ["dialog", "page", "drawer", "full-screen"] as const;

type ExportJSON = {
  productDetails: ProductDetails;
  paymentDetails: PaymentDetails;
  layout: (typeof layoutTypes)[number];
  theme: Omit<ThemeOptions, "unstable_strictMode" | "unstable_sxConfig">;
};

type Result = {
  data: ExportJSON | null;
  error: Error | null;
  loading: boolean;
};

const useLoadConfigFromIPFS = (hash: string): Result => {
  const [data, setData] = useState<ExportJSON | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!hash) return;

      setLoading(true);

      try {
        const res = await fetch(`${gateway}/ipfs/${hash}`);
        const data = await res.json();

        setData(data);

        setLoading(false);
      } catch (e) {
        setError(e as Error);
      }
    };

    load();
  }, [hash]);

  return {
    data,
    error,
    loading,
  };
};

export default useLoadConfigFromIPFS;
