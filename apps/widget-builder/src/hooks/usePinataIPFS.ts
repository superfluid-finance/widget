import pinataSDK, { PinataPinOptions } from "@pinata/sdk";
import { useCallback, useState } from "react";

import { ExportJSON } from "../types/export-json";

const usePinataIpfs = (pinOptions: PinataPinOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string>("");

  const pinata = new pinataSDK({
    pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY,
    pinataSecretApiKey: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
  });

  const publish = useCallback(async (data: ExportJSON) => {
    try {
      setIsLoading(true);
      const response = await pinata.pinJSONToIPFS(data, pinOptions);
      setIpfsHash(response.IpfsHash);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, []);

  return { publish, isLoading, ipfsHash };
};

export default usePinataIpfs;
