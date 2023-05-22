import { SuperTokenInfo } from "../formValues";
import { TokenList } from "@uniswap/token-lists";

export function filterSuperTokensFromTokenList(
  tokenList: TokenList
): ReadonlyArray<SuperTokenInfo> {
  return tokenList.tokens.filter(
    (x): x is SuperTokenInfo => !!x.extensions?.superTokenInfo
  );
}
