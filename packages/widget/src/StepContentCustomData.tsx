import { Stack, TextField } from "@mui/material";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FieldArray, useFieldArray, useFormContext } from "react-hook-form";

import { runEventListener } from "./EventListeners.js";
import { DraftFormValues } from "./formValues.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { useWidget } from "./WidgetContext.js";

export default function StepContentCustomData({ stepIndex }: StepProps) {
  const { control: c } = useFormContext<DraftFormValues>();

  const { fields, update } = useFieldArray({
    control: c,
    name: "customData",
  });

  const [errors, setErrors] =
    useState<Record<string, { success: boolean; error: string }>>();

  const onChange = useCallback(
    (
      field: FieldArray<DraftFormValues, "customData">,
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
      data: fields.reduce(
        (acc, field) => ({ ...acc, [field.label.toLowerCase()]: field.value }),
        {},
      ),
    });
  }, [eventListeners.onCustomDataUpdate, fields]);

  const validationResult = useMemo(
    () =>
      fields.reduce(
        (acc, { label, pattern, value }) => {
          if (pattern && !new RegExp(pattern).test(value ?? "")) {
            return {
              ...acc,
              [label.toLowerCase()]: {
                success: false,
                error: `Value must match pattern.`,
              },
            };
          }

          return {
            ...acc,
            [label.toLowerCase()]: {
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
    if (Object.values(validationResult).every((result) => result.success)) {
      setErrors(undefined);
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
                key={`custom-input-${i}`}
                data-testid={`input-${field.label}`}
                fullWidth
                required={field.pattern !== undefined}
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
