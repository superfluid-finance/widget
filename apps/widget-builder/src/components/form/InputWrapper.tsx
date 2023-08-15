import InfoIcon from "@mui/icons-material/Info";
import {
  FormControl,
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

const InputInfo: FC<InputInfoProps> = ({ tooltip }) => {
  const theme = useTheme();

  return (
    <Tooltip title={tooltip}>
      <InfoIcon fontSize="small" sx={{ color: theme.palette.grey[600] }} />
    </Tooltip>
  );
};

interface InputWrapperProps {
  id?: string;
  title: string;
  tooltip?: string;
  sx?: SxProps;
  children: (inputId: string) => PropsWithChildren["children"];
}

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  tooltip,
  sx = {},
  children,
  ...props
}) => {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  return (
    <FormControl sx={sx}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 0.75 }}
      >
        <FormLabel htmlFor={inputId}>{title}</FormLabel>
        {tooltip && <InputInfo tooltip={tooltip} />}
      </Stack>
      {children(inputId)}
    </FormControl>
  );
};

export default InputWrapper;
