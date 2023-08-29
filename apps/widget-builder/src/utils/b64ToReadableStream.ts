import { Readable } from "stream";

export const base64ToStream = (base64Input: string): Readable => {
  const buffer = Buffer.from(base64Input, "base64");

  return Readable.from(buffer);
};
