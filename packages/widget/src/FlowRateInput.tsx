import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";

import { FlowRate, TimePeriod, timePeriods } from "./core/index.js";

interface FlowRateInputProps {
  value: FlowRate;
  onChange: (newFlowRate: FlowRate) => void;
  onBlur?: () => void;
}

const FlowRateInput: FC<FlowRateInputProps> = ({ value, onChange, onBlur }) => {
  const { amountEther, period = "month" } = value ?? {};

  const onAmountEtherChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({ amountEther: e.target.value as `${number}`, period });
    },
    [period],
  );

  const onPeriodChange = useCallback(
    (e: SelectChangeEvent) => {
      onChange({
        amountEther: (amountEther ?? "") as `${number}`,
        period: e.target.value as TimePeriod,
      });
    },
    [amountEther],
  );

  return (
    <Stack gap="-1px" sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
      <TextField
        data-testid="custom-flow-rate-input-field"
        fullWidth
        value={amountEther}
        onChange={onAmountEtherChange}
        onBlur={onBlur}
        InputProps={{
          sx: {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      />
      <Select
        data-testid="custom-time-unit-dropdown"
        value={period}
        onChange={onPeriodChange}
        onBlur={onBlur}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: "-1px",
        }}
      >
        {timePeriods.map((interval) => (
          <MenuItem value={interval} key={interval}>
            /{interval}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default FlowRateInput;
