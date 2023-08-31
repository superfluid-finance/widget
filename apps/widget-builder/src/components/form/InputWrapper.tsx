import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  SxProps,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, PropsWithChildren, useId } from "react";

type InputInfoProps = {
  tooltip: string;
};

export const InputInfo: FC<InputInfoProps> = ({ tooltip }) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip}>
      <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
    </Tooltip>
  );
};

interface InputWrapperProps {
  id?: string;
  title?: string;
  tooltip?: string;
  sx?: SxProps;
  helperText?: string;
  optional?: boolean;
  error?: boolean;
  children: (inputId: string, error?: boolean) => PropsWithChildren["children"];
}

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  tooltip,
  sx = {},
  helperText,
  children,
  optional,
  error,
  ...props
}) => {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  const labelId = `label-${inputId}`;
  return (
    <FormControl sx={sx} error={error}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.75 }}>
        {!!title && (
          <FormLabel id={labelId} htmlFor={inputId} focused={false}>
            {title}
            {!!optional && (
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                (optional)
              </Typography>
            )}
          </FormLabel>
        )}
        {!!tooltip && <InputInfo tooltip={tooltip} />}
      </Stack>
      {children(inputId, error)}
      {!!helperText && (
        <FormHelperText aria-describedby={labelId}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputWrapper;
