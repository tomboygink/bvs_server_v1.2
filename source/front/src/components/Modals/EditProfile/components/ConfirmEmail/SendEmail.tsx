import { FC } from "react";
import { SendEmailView } from "./SendEmailView";

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
export const SendEmail: FC<Props> = ({ ...other }) => {
  return <SendEmailView {...other} />;
};
