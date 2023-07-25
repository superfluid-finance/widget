export default function ensureDefined<T>(value: T | undefined | null): T {
  if (!value) throw Error("Value has to be defined.");
  return value;
}
