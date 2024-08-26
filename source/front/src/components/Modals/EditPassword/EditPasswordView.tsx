import { ChangeEvent, FC } from "react";
import { Alert } from "@mui/material";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { InputWithIcon } from "@components/_shared/Inputs/InputWithIcon";
import { Button } from "@components/_shared/Button";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { FormErrors } from "@hooks/useFormWithValidation";

interface Props {
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  errors: FormErrors;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}

export const EditPasswordView: FC<Props> = ({
  handleChange,
  errors,
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
            name="old_password"
            placeholder="Старый пароль"
            onChange={handleChange}
            variant="outlined"
            error={Boolean(errors.old_password)}
            helperText={errors.old_password}
          />
          <InputWithIcon
            name="new_password"
            placeholder="Новый пароль"
            onChange={handleChange}
            variant="outlined"
            error={Boolean(errors.new_password)}
            helperText={errors.new_password}
          />
          <InputWithIcon
            name="confirm"
            placeholder="Повторите пароль"
            onChange={handleChange}
            variant="outlined"
            error={Boolean(errors.confirm)}
            helperText={errors.confirm}
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
