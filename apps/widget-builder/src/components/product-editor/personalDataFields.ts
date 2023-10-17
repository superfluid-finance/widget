import { serializeRegExp } from "@superfluid-finance/widget/utils";

const personalDataFields = [
  {
    label: "Email",
    required: {
      pattern: serializeRegExp(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g,
      ),
      message: "Invalid email address",
    },
  },
  {
    label: "Phone Number",
    required: {
      pattern: serializeRegExp(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      ),
      message: "Invalid phone number",
    },
  },
] as const;

export type CustomField = (typeof personalDataFields)[number];

export type CustomFieldType = Lowercase<CustomField["label"]>;

export default personalDataFields;
