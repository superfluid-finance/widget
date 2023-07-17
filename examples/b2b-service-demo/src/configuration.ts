const Configuration = {
  TheThing: process.env.NEXT_PUBLIC_THE_THING,
  IntercomAppID: "o7qlnuli",
  IntercomSurveyID: 34698139,
  WalletConnectProjectID: "952483bf7a0f5ace4c40eb53967f1368",
  Receiver: "0xE0537ea8F1d5A304635ce05D6F6b0D71fCfAB3a1" as `0x${string}`,
  Token: "0x42bb40bf79730451b11f6de1cba222f17b87afd7" as `0x${string}`,
  Sender: "0xab1D164065aed9A3e42fca42c2c20997f369A2B0" as `0x${string}`,
  CFAV1ForwarderAddress:
    "0xcfA132E353cB4E398080B9700609bb008eceB125" as `0x${string}`,
};

export default Object.freeze(Configuration);
