import { Box, Button, TextField } from "@mui/material";
import {
  useProduct,
} from "./ProductProvider";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { productInfoSchema } from "./productTypes";

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [product, setProduct] = useProduct();

  const productJson = useMemo(() => {
    try {
      return JSON.stringify(product, null, 2);
    } catch (e) {
      return "JSON.stringify error";
    }
  }, [product]);

  const {
    control: c,
    handleSubmit,
    formState: { errors },
  } = useForm<
    {
      product: string;
    },
    any,
    z.infer<typeof productFormSchema>
  >({
    defaultValues: {
      product: productJson,
    },
    resolver: zodResolver(productFormSchema),
  });

  // TODO(KK): Make react-hook-form display all the nested errors.

  return (
    <Box p={3} width="640px">
      <form
        onSubmit={handleSubmit(({ product: product_ }) => {
          setProduct(product_);
          onSuccess();
        })}
      >
        <ErrorMessage
          errors={errors}
          name="product"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
        <Button fullWidth variant="contained" type="submit">
          Save
        </Button>
        <Controller
          control={c}
          name="product"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextField
              label="Product JSON"
              multiline
              variant="standard"
              fullWidth
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              InputProps={{
                sx: {
                  fontFamily: "monospace",
                },
              }}
            />
          )}
        />
      </form>
    </Box>
  );
}

const productFormSchema = z.object({
  product: z
    .string()
    .transform((val, ctx) => {
      try {
        const parsed = JSON.parse(val) as unknown;
        return parsed;
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a valid JSON string",
        });
        return z.NEVER;
      }
    })
    .pipe(productInfoSchema),
});