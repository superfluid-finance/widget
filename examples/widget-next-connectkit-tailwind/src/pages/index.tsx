import { Inter } from "next/font/google";
import * as React from "react";

import SuperfluidCheckout from "@/components/Checkout";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [initialChainId, setInitialChainId] = React.useState<
    number | undefined
  >(undefined);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Providers initialChainId={initialChainId}>
        <SuperfluidCheckout setInitialChainId={setInitialChainId} />
      </Providers>
    </main>
  );
}
