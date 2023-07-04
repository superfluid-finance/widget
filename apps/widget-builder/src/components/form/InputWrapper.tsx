import InfoIcon from "@mui/icons-material/Info";
import {
  FormGroup,
  FormLabel,
  Stack,
  SxProps,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, PropsWithChildren } from "react";

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

interface InputWrapperProps extends PropsWithChildren {
  title: string;
  tooltip?: string;
  sx?: SxProps;
}

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  tooltip,
  sx = {},
  children,
}) => (
  <FormGroup sx={sx}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 0.75 }}
    >
      <FormLabel>{title}</FormLabel>
      {tooltip && <InputInfo tooltip={tooltip} />}
    </Stack>
    {children}
  </FormGroup>
);

export default InputWrapper;
