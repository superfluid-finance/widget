import { cleanup, render, screen, within } from "@testing-library/react";
import { createPublicClient, http } from "viem";
import { afterEach, expect, test } from "vitest";
import { createConfig, mainnet, WagmiConfig } from "wagmi";

import { Widget } from "../src/Widget";
import { oldWidgetConfig } from "./oldWidgetConfig";

afterEach(() => {
  cleanup();
});

const createDummyWagmiConfig = () =>
  createConfig({
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http("https://test.test"),
    }),
  });

test("the widget renders with minimum configuration", () => {
  render(
    <WagmiConfig config={createDummyWagmiConfig()}>
      <Widget
        productDetails={{
          name: "Test Product",
        }}
        paymentDetails={{
          paymentOptions: [
            {
              chainId: 1,
              receiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
              superToken: {
                address: "0xd70408b34ed121722631d647d37c4e6641ec363d",
              },
            },
          ],
        }}
      />
    </WagmiConfig>,
  );

  const productName = within(screen.getByTestId("product-name"));
  expect(productName.getByText("Test Product")).toBeDefined();
});

test("the widget renders with an old configuration", () => {
  render(
    <WagmiConfig config={createDummyWagmiConfig()}>
      <Widget {...(oldWidgetConfig as any)} type="page" />
    </WagmiConfig>,
  );

  const productName = within(screen.getByTestId("product-name"));
  expect(productName.getByText("Superfluid Subscriptions")).toBeDefined();
});
