import { FC } from "react";

import { useAutoConnect } from "../../hooks/useAutoConnect";

const AutoConnect: FC = () => {
  useAutoConnect();
  return null;
};

export default AutoConnect;
