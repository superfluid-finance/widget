import { faker } from "@faker-js/faker";
import {
  ExistentialNFT,
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
      chainId: supportedNetwork.optimismSepolia.id,
      superToken: {
        address: "0xfd0957cbf7c1638581a3cdeb16256e5f08e7ce75", // fTUSDx
      },
    } as const,
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.optimismSepolia.id,
      superToken: {
        address: "0x00d05Eed85Bad962bA5237DD4aFFF12004455a8a", // fUSDCx
      },
      flowRate: {
        amountEther: "1",
        period: "month",
      },
    } as const,
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.optimismSepolia.id,
      superToken: {
        address: "0xD6FAF98BeFA647403cc56bDB598690660D5257d2", // fDAIx
      },
      transferAmountEther: "1",
      flowRate: {
        amountEther: "1",
        period: "month",
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
//
const defaultPaymentDetails: WidgetProps["paymentDetails"] = {
  paymentOptions: [
    {
      receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22", // rebounder
      chainId: supportedNetwork.optimismSepolia.id,
      superToken: {
        address: "0x131780640EDf9830099AAc2203229073d6D2FE69", // fUSDCx
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
  primaryColor: "rgb(29, 178, 39)",
  secondaryColor: "rgb(255, 255, 255)",
  stepperOrientation: "vertical",
};

const defaultExistentialNFT: ExistentialNFT = {
  name: "",
  symbol: "",
  owner: "",
  deployments: {},
};

const demoExistentialNFT: ExistentialNFT = {
  name: "Demo NFT",
  symbol: "DEMO",
  owner: "0xab1D164065aed9A3e42fca42c2c20997f369A2B0",
  deployments: {
    11155420: "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f", // TODO: doesn't exist
  },
};
//
export const defaultWidgetProps: WidgetProps = {
  productDetails: defaultProductDetails,
  paymentDetails: defaultPaymentDetails,
  personalData: [],
  existentialNFT: defaultExistentialNFT,
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

  const setDemoExistentialNFT = useCallback(
    () => setValue("existentialNFT", demoExistentialNFT),
    [setValue],
  );

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
    setDemoExistentialNFT,
    setDemoStyling,
  };
};

export default useDemoMode;
