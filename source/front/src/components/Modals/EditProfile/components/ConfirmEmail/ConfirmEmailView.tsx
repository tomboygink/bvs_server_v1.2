import { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Typography } from "@components/_shared/Typography";
import { CloseButton } from "@components/_shared/CloseButton";
import { Button } from "@components/_shared/Button";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  open: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  handleClose: () => void;
  repeatSendEmail: () => void;
  email: string;
  textButton: string;
  count: number;
}
export const ConfirmEmailView: FC<Props> = ({
  open,
  isDisabled,
  isLoading,
  handleClose,
  repeatSendEmail,
  email,
  textButton,
  count,
}) => {
  const cx = useStyles(styles);
  return (
    <>
      <Dialog open={open} onClose={handleClose} className={cx("modal")}>
        <DialogTitle className={cx("head")}>
          <Typography> Изменение данных</Typography>
          <CloseButton onClose={handleClose} />
        </DialogTitle>
        <DialogContent className={cx("content")}>
          <p className={cx("large-text")}>Проверьте свою электронную почту</p>
          <p className={cx("small-text")}>
            Для продолжения работы необходимо подтвердить свою учетную запись.
            <br />
            Код подтверждения отправлен на адрес{" "}
            <span className={cx("email")}>{email}</span> .
            <br /> Если вы не получили письмо, пожалуйста, проверьте папку со
            спамом.
            <br />
          </p>
          <div className={cx("svg-wrapper")}>
            <svg
              width="64"
              height="51"
              viewBox="0 0 64 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.0347222 3.5604C0.0347222 1.59405 1.6266 0 3.59028 0H60.4444C62.4081 0 64 1.59405 64 3.5604V43.8792C64 47.8119 60.8163 51 56.8889 51H7.11111C3.18375 51 0 47.8119 0 43.8792V4.71475C0 4.54521 0.0118349 4.37843 0.0347222 4.2152V3.5604ZM7.11111 11.4779V43.8792H56.8889V11.4791L39.5431 28.8485C35.3775 33.0198 28.6237 33.0198 24.4581 28.8485L7.11111 11.4779ZM12.7016 7.00563H51.2996L34.5148 23.8134C33.1262 25.2038 30.875 25.2038 29.4865 23.8134L12.7016 7.00563Z"
                fill="#E6EAF1"
              />
            </svg>
          </div>
        </DialogContent>
        <DialogActions className={cx("buttons")}>
          <Button onClick={handleClose}>Назад</Button>
          <Button
            onClick={repeatSendEmail}
            isLoading={count > 1 ? isLoading : false}
            disabled={isDisabled}
          >
            {textButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
