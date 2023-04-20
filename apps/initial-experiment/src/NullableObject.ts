type NullableObject<T> = {
  [P in keyof T]: T[P] | null;
};

export default NullableObject;
