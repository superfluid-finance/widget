import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import {
  Box,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  EmailField,
  PersonalDataField,
  PersonalDataFieldType,
  PhoneNumberField,
} from "@superfluid-finance/widget/utils";
import { FC, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import useDemoMode from "../../hooks/useDemoMode";
import InputWrapper from "../form/InputWrapper";
import ImageSelect from "../image-select/ImageSelect";
import { WidgetProps } from "../widget-preview/WidgetPreview";

const ProductEditor: FC = () => {
  const { control, watch } = useFormContext<WidgetProps>();

  const [selectedPersonalDataFields, setSelectedPersonalDataFields] = useState<
    Partial<Record<PersonalDataFieldType, boolean>>
  >({});

  watch(["paymentDetails.paymentOptions"]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalData",
  });
  const { setDemoProductDetails } = useDemoMode();

  const onPersonalDataSelectionChange = (field: PersonalDataField) => {
    const isFieldSelected =
      selectedPersonalDataFields[field.name as PersonalDataFieldType];

    const index = fields.findIndex(({ name }) => name === field.name);

    isFieldSelected ? remove(index) : append(field);

    setSelectedPersonalDataFields((prev) => ({
      ...prev,
      [field.name]: !isFieldSelected,
    }));
  };

  return (
    <>
      <Stack gap={2}>
        <Box mb={1}>
          <Typography variant="h6" component="h2">
            Checkout Product Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Define the product you want to receive ongoing real-time payments
            for.
          </Typography>
        </Box>
        <Controller
          control={control}
          name="productDetails.name"
          render={({ field: { value, onChange } }) => (
            <InputWrapper title="Product Name" optional>
              {(id) => (
                <TextField
                  id={id}
                  placeholder=""
                  data-testid="product-name-field"
                  value={value}
                  onChange={onChange}
                />
              )}
            </InputWrapper>
          )}
        />

        <Controller
          control={control}
          name="productDetails.description"
          render={({ field: { value, onChange } }) => (
            <InputWrapper title="Product Description" optional>
              {(id) => (
                <TextField
                  id={id}
                  data-testid="product-description-field"
                  placeholder=""
                  multiline
                  minRows={4}
                  value={value}
                  onChange={onChange}
                />
              )}
            </InputWrapper>
          )}
        />
        <Controller
          control={control}
          name="productDetails.imageURI"
          render={({ field: { value, onChange } }) => (
            <InputWrapper id="product-image" title="Product Image" optional>
              {(id) => (
                <ImageSelect
                  id={id}
                  onClick={(file) => onChange(URL.createObjectURL(file))}
                  onRemove={() => onChange("")}
                  imageSrc={value}
                />
              )}
            </InputWrapper>
          )}
        />
      </Stack>
      <Stack mt={4}>
        <Box mb={1}>
          <Typography variant="subtitle2" component="h2">
            Personal Data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add personal data fields to collect additional information from your
            users.
          </Typography>
        </Box>
        <FormGroup>
          {[EmailField, PhoneNumberField].map((field, i) => (
            <FormControlLabel
              key={`${field.name}-${i}`}
              control={
                <Checkbox
                  value={
                    selectedPersonalDataFields[
                      field.name as PersonalDataFieldType
                    ]
                  }
                  onChange={() => onPersonalDataSelectionChange(field)}
                />
              }
              label={field.label}
            />
          ))}
        </FormGroup>
      </Stack>
      <Tooltip
        title="Replace with demo product details"
        placement="right"
        arrow
      >
        <Fab
          data-testid="wand-button"
          size="medium"
          color="secondary"
          onClick={setDemoProductDetails}
          sx={{
            position: "absolute",
            bottom: 72,
            left: 20,
          }}
        >
          <AutoFixHighIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default ProductEditor;
