export type NullableObject<T> = {
  [P in keyof T]: T[P] | null;
};

export type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;
