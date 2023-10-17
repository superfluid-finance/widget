
const personalDataFields = [
  {
    label: "Email",
    required: {
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
      message: "Invalid email address",
    },
  },
] as const;

export type CustomField = (typeof personalDataFields)[number];

export type CustomFieldType = Lowercase<CustomField["label"]>;

export default personalDataFields;
