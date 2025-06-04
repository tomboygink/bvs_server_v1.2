import { FC, ChangeEvent, useState } from "react";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@components/_shared/Typography";
import { InputWithIcon } from "@components/_shared/Inputs/InputWithIcon";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { SAVE_ERROR } from "@src/utils/messages";

interface Props {
  message: string;
  errors: FormErrors;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  isErrorSave: boolean;

  isLoading: boolean;
  isValid: boolean;
  values?: FormValues;
}
export const LoginView: FC<Props> = ({
  message,
  errors,
  onChange,
  isErrorSave,

  isLoading,
  isValid,
}) => {
  const cx = useStyles(styles);

  //Состояние и функция для отслеживания значения в input для логина, чтобы при перезагрузке и автозаполнении была активна кнопка входа
  const [valueLog, setValueLog] = useState<string>('')
  const onInputLogHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValueLog(e.target.value)
  }

  //const { handleChange } = useFormValidation();
  return (
    <>
      <div className={cx("container")}>
        <Typography className={cx("title")} variant="h4">
          Авторизация
        </Typography>
        <Typography className={cx("subtitle")} variant="body1">
          Пожалуйста, введите ваш логин и пароль
        </Typography>
        <fieldset className={cx("fields")}>
          <InputText
            name="login"
            placeholder="Логин"
            onChange={onChange}
            onInput={onInputLogHandler}
            variant="standard"
            error={Boolean(errors.login)}
            helperText={errors.login}
            
            InputProps={{
              style: {
                fontSize: 16,
                padding: "4px 12px",
                boxSizind: "border-box",
              },
            }}
          />
          <InputWithIcon
            name="password"
            placeholder="Пароль"
            onChange={onChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </fieldset>
        <fieldset className={cx("btn-container")}>
          <Link className={cx("link")} to={ScreenRoute.FORGOTPASSWORD}>
            ← Забыли пароль?
          </Link>
          <Button disabled={valueLog !== '' ? !isValid : isValid} isLoading={isLoading}>
            Войти
          </Button>
        </fieldset>
      </div>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}

      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}
    </>
  );
};
