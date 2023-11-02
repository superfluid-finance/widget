import { PersonalDataInput } from "./core/PersonalData.js";
import { serializeRegExp } from "./utils.js";

export const EmailField = {
  name: "email",
  label: "Email",
  required: {
    pattern: serializeRegExp(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g,
    ),
    message: "Invalid email address",
  },
} as const satisfies PersonalDataInput;

export const EmailWithAliasField = {
  name: "email",
  label: "Email",
  required: {
    pattern: serializeRegExp(
      /^([a-zA-Z0-9_\-\.+\]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g,
    ),
    message: "Invalid email address",
  },
} as const satisfies PersonalDataInput;

export const PhoneNumberField = {
  name: "phone",
  label: "Phone Number",
  required: {
    pattern: serializeRegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    ),
    message: "Invalid phone number",
  },
} as const satisfies PersonalDataInput;

export type PersonalDataField = typeof EmailField | typeof PhoneNumberField;
export type PersonalDataFieldType = Lowercase<PersonalDataField["label"]>;
