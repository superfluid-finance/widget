import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import SubscribeForm from "./SubscribeForm";
import SubscribeTransaction from "./SubscribeTransaction";
import {
  ProductInfo as ProductInfo,
  addressSchema,
  chainIdSchema,
  etherAmountSchema,
  paymentOptionSchema,
} from "./productTypes";
import { z } from "zod";
import { Address, useAccount } from "wagmi";
import { parseEther } from "ethers/lib/utils.js";
import NullableObject from "../NullableObject";
import { Command } from "./commands";
import { TokenList, TokenInfo } from "@uniswap/token-lists";

const validFormSchema = z.object({
  chainId: chainIdSchema,
  accountAddress: addressSchema,
  tokenOption: paymentOptionSchema,
  wrapAmountEther: etherAmountSchema,
  autoWrap: z.boolean(),
  receiverAddress: addressSchema,
});

export type ValidForm = z.infer<typeof validFormSchema>;

export type DraftForm = NullableObject<ValidForm>;

export type CheckoutSettings = {
  productInfo: ProductInfo;
  tokenList: TokenList;
};

export const mapValidFormToCommands = (validForm: ValidForm): Command[] => {
  const {
    chainId,
    tokenOption: { superToken: superToken },
  } = validForm;

  const commands: Command[] = [];

  const wrapAmountWei = parseEther(validForm.wrapAmountEther ? validForm.wrapAmountEther : "0");
  if (!wrapAmountWei.isZero() && superToken.underlyingTokenAddress) {
    commands.push({
      chainId,
      title: "Wrap",
      amountEther: validForm.wrapAmountEther, // TODO(KK): Decimals need to be accounted somewhere!
      superTokenAddress: superToken.address,
      underlyingTokenAddress: superToken.underlyingTokenAddress,
    });
  }

  if (validForm.autoWrap && superToken.underlyingTokenAddress) {
    commands.push({
      chainId,
      title: "Auto-Wrap" as const,
      superTokenAddress: superToken.address,
      underlyingTokenAddress: superToken.underlyingTokenAddress,
    });
  }

  commands.push({
    chainId,
    title: "Subscribe",
    senderAddress: validForm.accountAddress,
    receiverAddress: validForm.receiverAddress,
    superTokenAddress: superToken.address,
    flowRate: validForm.tokenOption.flowRate,
  });

  return commands;
} 

export default function Subscribe({
  productInfo,
  tokenList,
}: CheckoutSettings) {
  const theme = useTheme();
  const { address: accountAddress } = useAccount();

  const formMethods = useForm<DraftForm, any, ValidForm>({
    defaultValues: {
      accountAddress: null,
      tokenOption: null,
      wrapAmountEther: "",
      autoWrap: null,
      receiverAddress: "0xdf3d1C11752B35A5a3d984cC86E5A535745412Fe",
    },
  });
  const { control: c, setValue, handleSubmit } = formMethods;

  useEffect(() => {
    setValue("accountAddress", accountAddress ?? null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [accountAddress]);

  const [commands, setCommands] = useState<Command[]>([]); // TODO: Use "form submitted" from react-hook-form instead?

  const onSubmit = useCallback(
    handleSubmit((validForm) => {
      const commands = mapValidFormToCommands(validForm);
      setCommands(commands);
    }),
    [handleSubmit]
  );

  const tokenMap = useMemo(
    () =>
      Object.freeze(new Map<Address, TokenInfo>(tokenList.tokens.map((x) => [x.address as Address, x]))),
    [tokenList]
  );

  return (
    <Box p={3} width="640px">
      <Stack>
        <Typography variant="h6" gutterBottom>
          Subscribe
        </Typography>

        <Box
          component={Card}
          variant="outlined"
          bgcolor={theme.palette.grey[200]}
          p={1}
        >
          <Typography variant="body1" fontWeight={600} gutterBottom>
            {productInfo.name}
          </Typography>
          <Typography variant="body2">{productInfo.description}</Typography>
        </Box>

        <FormProvider {...formMethods}>
          {!!commands.length ? (
            <SubscribeTransaction commands={commands} onBack={() => setCommands([])} />
          ) : (
            <SubscribeForm
              productInfo={productInfo}
              tokenMap={tokenMap}
              onSubmit={onSubmit}
            />
          )}
        </FormProvider>
      </Stack>
      <DevTool control={c} placement="bottom-left" />
    </Box>
  );
}
