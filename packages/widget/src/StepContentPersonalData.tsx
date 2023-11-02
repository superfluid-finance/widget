import { Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldArray, useFieldArray, useFormContext } from "react-hook-form";

import { PersonalData } from "./core/PersonalData.js";
import { runEventListener } from "./EventListeners.js";
import { DraftFormValues } from "./formValues.js";
import { StepProps } from "./Stepper.js";
import { useStepper } from "./StepperContext.js";
import { StepperCTAButton } from "./StepperCTAButton.js";
import { deserializeRegExp, Errors, mapPersonalDataToObject } from "./utils.js";
import { useWidget } from "./WidgetContext.js";

const validatePersonalData = (inputs: PersonalData) =>
  inputs.reduce(
    (acc, { name, required, value }) => {
      if (
        required?.pattern &&
        !deserializeRegExp(required.pattern).test(value ?? "")
      ) {
        return {
          ...acc,
          [name]: {
            success: false,
            message: required.message,
          },
        };
      }

      return {
        ...acc,
        [name]: {
          success: true,
        },
      };
    },
    {} as Record<string, { success: boolean; message?: string }>,
  );

export default function StepContentCustomData({ stepIndex }: StepProps) {
  const { control: c, setValue } = useFormContext<DraftFormValues>();

  const { fields, update } = useFieldArray({
    control: c,
    name: "personalData",
  });

  const [errors, setErrors] = useState<Errors>();

  const [externallyValidating, setExternallyValidating] = useState(false);

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

  const { eventListeners, callbacks } = useWidget();
  const { handleNext } = useStepper();

  useEffect(() => {
    runEventListener(eventListeners.onRouteChange, {
      route: "step_personal_data",
    });
  }, [eventListeners.onRouteChange]);

  useEffect(() => {
    runEventListener(eventListeners.onPersonalDataUpdate, {
      ...mapPersonalDataToObject(fields),
    });
  }, [eventListeners.onPersonalDataUpdate, setErrors, fields]);

  const validationResult = useMemo(
    () => validatePersonalData(fields),
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

  const onContinue = useCallback(async () => {
    setExternallyValidating(true);
    const externalValidationResult =
      await callbacks.validatePersonalData(fields);

    const isValid = Object.values(validationResult).every(
      (result) => result.success,
    );

    const isExternallyValid = Object.values(
      externalValidationResult ?? {},
    ).every((result) => result?.success);

    setExternallyValidating(false);

    if (isValid && isExternallyValid) {
      handleNext(stepIndex);
    } else {
      if (!isValid) {
        setErrors(validationResult);
      } else if (!isExternallyValid) {
        setErrors(externalValidationResult as Errors);
      }
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
                required={!field.optional}
                disabled={field.disabled}
                label={field.label}
                type="text"
                error={
                  errors && !Boolean(errors[field.label.toLowerCase()]?.success)
                }
                helperText={
                  errors && (errors[field.label.toLowerCase()]?.message ?? "")
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

          <StepperCTAButton loading={externallyValidating} onClick={onContinue}>
            Continue
          </StepperCTAButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
