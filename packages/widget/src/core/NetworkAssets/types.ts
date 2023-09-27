import { z } from "zod";

import { networkAssetInfoSchema, networkAssetsSchema } from "./schemas.js";

export interface NetworkAssetInfo
  extends z.infer<typeof networkAssetInfoSchema> {}

export interface NetworkAssets extends z.infer<typeof networkAssetsSchema> {}
