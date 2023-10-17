
const customDataFields = [
  {
    label: "Email",
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
  {
    label: "Phone",
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
] as const;

export type CustomField = (typeof customDataFields)[number];

export type CustomFieldType = Lowercase<CustomField["label"]>;

export default customDataFields;
