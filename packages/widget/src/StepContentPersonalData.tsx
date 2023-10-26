import { Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldArray, useFieldArray, useFormContext } from "react-hook-form";

import { runEventListener } from "./EventListeners.js";
import { DraftFormValues } from "./formValues.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { deserializeRegExp, mapPersonalDataToObject } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentCustomData({ stepIndex }: StepProps) {
  const { control: c } = useFormContext<DraftFormValues>();

  const { fields, update } = useFieldArray({
    control: c,
    name: "personalData",
  });

  const [errors, setErrors] =
    useState<Record<string, { success: boolean; error: string }>>();

  const onChange = useCallback(
    (
      field: FieldArray<DraftFormValues, "personalData">,
      value: string,
      index: number,
    ) => {
      update(index, {
        ...field,
        value,
      });
    },
    [fields],
  );

  const { eventListeners } = useWidget();
  const { handleNext } = useStepper();

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, {
      route: "step_custom_data",
    });
  }, [eventListeners.onRouteChange]);

  useEffect(() => {
    runEventListener(eventListeners.onCustomDataUpdate, {
      ...mapPersonalDataToObject(fields),
    });
  }, [eventListeners.onCustomDataUpdate, fields]);

  const validationResult = useMemo(
    () =>
      fields.reduce(
        (acc, { name, required, value }) => {
          if (
            required?.pattern &&
            !deserializeRegExp(required.pattern).test(value ?? "")
          ) {
            return {
              ...acc,
              [name]: {
                success: false,
                error: required.message,
              },
            };
          }

          return {
            ...acc,
            [name]: {
              success: true,
              error: "",
            },
          };
        },
        {} as Record<string, { success: boolean; error: string }>,
      ),
    [fields],
  );

  useEffect(() => {
    const result = Object.entries(validationResult).find(
      ([_, { success }]) => success,
    );
    if (result) {
      setErrors({ ...errors, [result[0]]: result[1] });
    }
  }, [validationResult]);

  const onContinue = useCallback(() => {
    runEventListener(eventListeners.onButtonClick, { type: "next_step" });

    if (Object.values(validationResult).every((result) => result.success)) {
      handleNext(stepIndex);
    } else {
      setErrors(validationResult);
    }
  }, [handleNext, eventListeners.onButtonClick, stepIndex, validationResult]);

  return (
    <Stack
      direction="column"
      alignItems="stretch"
      justifyContent="space-around"
      spacing={3}
      sx={{ pt: 1, pb: 3, px: 3.5 }}
    >
      <Stack direction="column" spacing={2.5} textAlign="center">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <Stack direction="row" flexWrap="wrap" gap={2} sx={{ pb: 2 }}>
            {fields.map((field, i) => (
              <TextField
                name={field.name}
                key={`input-${field.name}-${i}`}
                data-testid={`input-${field.name}`}
                fullWidth
                required={Boolean(field.required)}
                disabled={field.disabled}
                label={field.label}
                type="text"
                error={
                  errors && !Boolean(errors[field.label.toLowerCase()]?.success)
                }
                helperText={
                  errors && (errors[field.label.toLowerCase()]?.error ?? "")
                }
                value={field.value ?? ""}
                onChange={({ target }) => onChange(field, target.value, i)}
                sx={{
                  ...(field.size === "half"
                    ? {
                        width: "calc(50% - 8px)",
                      }
                    : {}),
                }}
              />
            ))}
          </Stack>

          <StepperCTAButton onClick={onContinue}>Continue</StepperCTAButton>
        </Stack>
      </Stack>
    </Stack>
  );
}