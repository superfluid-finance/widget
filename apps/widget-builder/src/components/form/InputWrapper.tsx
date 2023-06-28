import InfoIcon from "@mui/icons-material/Info";
import { FormGroup, Stack, Tooltip, Typography, useTheme } from "@mui/material";
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
}

const InputWrapper: FC<InputWrapperProps> = ({ title, tooltip, children }) => (
  <Stack gap={0.75} flex={1}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body1" fontWeight="500">
        {title}
      </Typography>
      {tooltip && <InputInfo tooltip={tooltip} />}
    </Stack>
    {children}
  </Stack>
);

export default InputWrapper;
