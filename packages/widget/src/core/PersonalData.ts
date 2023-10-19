import { z } from "zod";

const RegexSchema = z.string().refine(
  (value) => {
    try {
      new RegExp(value);
      return true;
    } catch (e) {
      return false;
    }
  },
  {
    message: "Invalid regex pattern",
  },
);

export const personalDataInputSchema = z.object({
  name: z.string(),
  label: z.string(),
  required: z
    .object({
      pattern: RegexSchema,
      message: z.string(),
    })
    .optional(),
  disabled: z.boolean().optional(),
  size: z.enum(["half", "full"]).default("full").optional(),
  value: z.string().default("").optional(),
});

export const personalDataSchema = z.array(personalDataInputSchema);

export type PersonalDataInput = z.infer<typeof personalDataInputSchema>;
export interface PersonalData extends z.infer<typeof personalDataSchema> {}
