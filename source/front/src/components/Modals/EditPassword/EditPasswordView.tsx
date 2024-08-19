import { ChangeEvent, FC } from "react";
import { Alert } from "@mui/material";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { InputWithIcon } from "@components/_shared/Inputs/InputWithIcon";
import { Button } from "@components/_shared/Button";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}

export const EditPasswordView: FC<Props> = ({
  handleChange,
  message,
  isErrorSave,
  isLoading,
  isSuccessSave,
  isValid,
}) => {
  const cx = useStyles(styles);
  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("input-container")}>
          <InputWithIcon
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            variant="outlined"
          />
          <InputWithIcon
            name="new_password"
            placeholder="Новый пароль"
            onChange={handleChange}
            variant="outlined"
          />
          <InputWithIcon
            name="confirm"
            placeholder="Повторите пароль"
            onChange={handleChange}
            variant="outlined"
          />
        </fieldset>
      </div>
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

      <div className={cx("button")}>
        <Button disabled={!isValid} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
