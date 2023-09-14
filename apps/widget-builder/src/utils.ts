export function shortenHex(address: string, length = 4) {
  return `${address.substring(0, 2 + length)}...${address.substring(
    address.length - length,
    address.length,
  )}`;
}

export function polyfill() {
  // Polyfill BigInt JSON serialization
  // @ts-ignore
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
}
