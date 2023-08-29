export const oldWidgetConfig = {
  productDetails: {
    name: "Superfluid Subscriptions",
    description:
      "Superfluid Subscriptions enable web3 services to eliminate merchant fees, accept recurring crypto payments, grow their user base, and seamlessly generate revenue.",
    imageURI: "https://test.test/test.jpeg",
  },
  paymentDetails: {
    defaultReceiverAddress: "",
    paymentOptions: [
      {
        receiverAddress: "0xf26ce9749f29e61c25d0333bce2301cb2dfd3a22",
        chainId: 5,
        superToken: {
          address: "0x8ae68021f6170e5a766be613cea0d75236ecca9a",
        },
        flowRate: {
          amountEther: "1",
          period: "month",
        },
      },
      {
        receiverAddress: "0xdf3d1C11752B35A5a3d984cC86E5A535745412Fe",
        superToken: {
          address: "0x42bb40bf79730451b11f6de1cba222f17b87afd7",
        },
        chainId: 80001,
        flowRate: {
          amountEther: "1",
          period: "month",
        },
      },
    ],
  },
  layout: "page",
  theme: {
    typography: {
      fontFamily: "'Noto Sans', 'sans-serif'",
    },
    palette: {
      mode: "light",
      primary: {
        main: "#1DB227",
      },
      secondary: {
        main: "#fff",
      },
    },
    shape: {
      borderRadius: 20,
    },
    components: {
      MuiStepIcon: {
        styleOverrides: {
          text: {
            fill: "#fff",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  },
} as const;
