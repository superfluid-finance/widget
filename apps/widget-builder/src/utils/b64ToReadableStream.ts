import { Readable } from "stream";

export const base64ToStream = (base64Input: string): Readable => {
  const buffer = Buffer.from(base64Input.split(",")[1], "base64");

  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  return stream;
};
