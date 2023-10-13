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

export const customInputSchema = z.object({
  label: z.string(),
  pattern: RegexSchema.optional(),
  size: z.enum(["half", "full"]).default("full").optional(),
  value: z.string().default("").optional(),
});

export const customDataSchema = z.array(customInputSchema);

export interface CustomData extends z.infer<typeof customDataSchema> {}
