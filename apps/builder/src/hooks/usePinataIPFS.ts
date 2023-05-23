import { useCallback, useState } from "react";

import pinataSDK, { PinataConfig, PinataPinOptions } from "@pinata/sdk";
import { ExportJSON } from "../types/export-json";

const usePinataIpfs = (config: PinataConfig, pinOptions: PinataPinOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");

  const publish = useCallback(
    async (data: ExportJSON) => {
      const pinata = new pinataSDK(config);

      try {
        setIsLoading(true);
        const response = await pinata.pinJSONToIPFS(data, pinOptions);
        setIpfsHash(response.IpfsHash);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    },
    [config]
  );

  return { publish, isLoading, ipfsHash };
};

export default usePinataIpfs;
