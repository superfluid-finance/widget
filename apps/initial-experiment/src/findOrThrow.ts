export default function findOrThrow<T>(
  arr: T[],
  predicate: (value: T) => boolean
): T {
  const result = arr.find(predicate);
  if (result === undefined) {
    throw new Error("Element not found in array");
  }
  return result;
}
