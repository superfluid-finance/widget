import { faker } from "@faker-js/faker";
import {
  ProductDetails,
  supportedNetwork,
} from "@superfluid-finance/widget";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import {
  DisplaySettings,
  Layout,
  WidgetProps,
} from "../components/widget-preview/WidgetPreview";

const defaultProductDetails: ProductDetails = {
  name: "",
  description: "",
  imageURI: "",
};

const demoPaymentDetails: WidgetProps["paymentDetails"] = {
  paymentOptions: [
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.goerli.id,
      superToken: {
        address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a", // fUSDCx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.goerli.id,
      superToken: {
        address: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00", // fDAIx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // vitalik.eth
      chainId: supportedNetwork.goerli.id,
      superToken: {
        address: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // ZYA
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0x7d3e32ae08f50387a83cf222e08d8ec26317d7aa", // vitalik.eth
      chainId: supportedNetwork.goerli.id,
      superToken: {
        address: "0xcc48a0349077b91ab540d2e46addffb4a4a26251", // NTDL
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.polygonMumbai.id,
      superToken: {
        address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7", // fUSDCx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // rebounder
      chainId: supportedNetwork.polygonMumbai.id,
      superToken: {
        address: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // fDAIx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // rebounder
      chainId: supportedNetwork.polygonMumbai.id,
      superToken: {
        address: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // fDAIx
      },
    } as const,
    {
      receiverAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // vitalik.eth
      chainId: supportedNetwork.celo.id,
      superToken: {
        address: "0x62b8b11039fcfe5ab0c56e502b1c372a3d2a9c7a", // G$
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
  ],
};

const defaultPaymentDetails: WidgetProps["paymentDetails"] = {
  paymentOptions: [
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.goerli.id,
      superToken: {
        address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a", // fUSDCx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
  ],
};

const type: Layout = "page";

const defaultDisplaySettings: DisplaySettings = {
  darkMode: false,
  containerRadius: 20,
  buttonRadius: 10,
  inputRadius: 10,
  font: {
    family: "Noto Sans",
    category: "sans-serif",
  },
  primaryColor: "#1DB227",
  secondaryColor: "#fff",
  stepperOrientation: "vertical",
};

export const defaultWidgetProps: WidgetProps = {
  productDetails: defaultProductDetails,
  paymentDetails: defaultPaymentDetails,
  type,
  displaySettings: defaultDisplaySettings,
};

const useDemoMode = () => {
  const { setValue } = useFormContext<WidgetProps>();

  const setDemoPaymentDetails = useCallback(
    () => setValue("paymentDetails", demoPaymentDetails),
    [setValue],
  );

  const setDemoProductDetails = useCallback(() => {
    const demoProductDetails: ProductDetails = {
      name: `${faker.commerce.productName()}`,
      description: `${faker.commerce.productDescription()}`,
      imageURI: "https://picsum.photos/200/200",
    };
    setValue("productDetails", demoProductDetails);
  }, [setValue]);

  const setDemoStyling = useCallback(() => {
    const demoStyling: DisplaySettings = {
      ...defaultDisplaySettings,
      darkMode: faker.datatype.boolean(),
      primaryColor: faker.color.rgb() as `#${string}`,
      secondaryColor: faker.color.rgb() as `#${string}`,
      containerRadius: faker.number.int({ min: 0, max: 50 }),
      buttonRadius: faker.number.int({ min: 0, max: 25 }),
      inputRadius: faker.number.int({ min: 0, max: 25 }),
    };
    setValue("displaySettings", demoStyling);
  }, [setValue]);

  return {
    setDemoPaymentDetails,
    setDemoProductDetails,
    setDemoStyling,
  };
};

export default useDemoMode;
