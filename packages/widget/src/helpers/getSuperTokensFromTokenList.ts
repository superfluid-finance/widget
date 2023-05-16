import { SuperTokenInfo } from "../formValues";
import { TokenList } from "@uniswap/token-lists";

export function getSuperTokensFromTokenList(
  tokenList: TokenList
): ReadonlyArray<SuperTokenInfo> {
  return tokenList.tokens.filter(
    (x): x is SuperTokenInfo => !!x.extensions?.superTokenInfo
  );
}
