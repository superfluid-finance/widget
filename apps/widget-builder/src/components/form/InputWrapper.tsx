import InfoIcon from "@mui/icons-material/Info";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  SxProps,
  Tooltip,
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
      <InfoIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
    </Tooltip>
  );
};

interface InputWrapperProps {
  id?: string;
  title?: string;
  tooltip?: string;
  sx?: SxProps;
  helperText?: string;
  children: (inputId: string) => PropsWithChildren["children"];
}

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  tooltip,
  sx = {},
  helperText,
  children,
  ...props
}) => {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  const labelId = `label-${inputId}`;
  return (
    <FormControl sx={sx}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.75 }}>
        {!!title && (
          <FormLabel id={labelId} htmlFor={inputId} focused={false}>
            {title}
          </FormLabel>
        )}
        {!!tooltip && <InputInfo tooltip={tooltip} />}
      </Stack>
      {children(inputId)}
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputWrapper;
