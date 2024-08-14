import { FC } from "react";
import { ConfirmEmailView } from "./ConfirmEmailView";

interface Props {
  open: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  handleClose: () => void;
  email: string;
  repeatSendEmail: () => void;
  textButton: string;
  count: number;
}
export const ConfirmEmail: FC<Props> = ({ ...other }) => {
  return <ConfirmEmailView {...other} />;
};
