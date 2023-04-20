export default function getOrThrow<K, V>(map: Map<K, V>, key: K): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`Key "${key}" not found in Map`);
  }
  return value;
}
