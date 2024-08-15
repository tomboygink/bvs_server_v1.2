import { FC, FormEvent } from "react";
import { Alert, SelectChangeEvent } from "@mui/material";
import { Button } from "@components/_shared/Button";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  // onConfirm: () => void;
  handleSubmit: (event: FormEvent) => void;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}
export const ConfirmEmailView: FC<Props> = ({
  handleSubmit,
  message,
  isErrorSave,
  isLoading,
  isSuccessSave,
}) => {
  const cx = useStyles(styles);
  return (
    <section className={cx("page")}>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <p className={cx("text")}>Нажмите для подтверждения</p>
        {message && (
          <Alert className={cx("alert")} severity="error">
            {message}
          </Alert>
        )}
        {isSuccessSave && (
          <Alert className={cx("alert")} severity="success">
            {SAVE_SUCCESS}
          </Alert>
        )}
        {isErrorSave && (
          <Alert className={cx("alert")} severity="error">
            {SAVE_ERROR}
          </Alert>
        )}
        <Button type="submit" isLoading={isLoading}>
          Подтвердить
        </Button>
      </form>
    </section>
  );
};
