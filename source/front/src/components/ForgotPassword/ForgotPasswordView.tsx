import { FC, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { Typography } from "@components/_shared/Typography";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { SAVE_ERROR } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { FormErrors } from "@hooks/useFormWithValidation";

interface Props {
  errors: FormErrors;
  isValid: boolean;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (event: FormEvent) => void;
}
export const ForgotPasswordView: FC<Props> = (props) => {
  const {
    errors,
    isValid,
    message,
    isErrorSave,
    isLoading,
    isSuccessSave,
    handleChange,
    handleSubmit,
  } = props;
  const cx = useStyles(styles);
  return (
    <section className={cx("section")}>
      <form className={cx("form")} onSubmit={handleSubmit} noValidate>
        <div className={cx("container")}>
          <Typography className={cx("title")} variant="h4">
            Забыли пароль?
          </Typography>
          <Typography className={cx("subtitle")} variant="body1">
            Пожалуйста, введите ваш e-mail. Вы получите код для восстановления
            по электронной почте
          </Typography>
          <fieldset className={cx("fields")}>
            <InputText
              name="email"
              placeholder="e-mail"
              onChange={handleChange}
              variant="standard"
              type="email"
              InputProps={{
                style: {
                  fontSize: 16,
                  padding: "4px 12px",
                  boxSizind: "border-box",
                },
              }}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </fieldset>
          <fieldset className={cx("btn-container")}>
            <Link className={cx("link")} to={ScreenRoute.LOGIN}>
              ← Вернуться на форму авторизации
            </Link>
            <Button
              disabled={!isValid}
              isLoading={isLoading}
              type="submit"
              size="small"
            >
              Получить&nbsp;код
            </Button>
          </fieldset>
          {message && (
            <Alert className={cx("alert")} severity="error">
              {message}
            </Alert>
          )}
          {isSuccessSave && (
            <Alert className={cx("alert")} severity="success">
              {"Письмо отправлено. Проверьте почту."}
            </Alert>
          )}
          {isErrorSave && (
            <Alert className={cx("alert")} severity="error">
              {SAVE_ERROR}
            </Alert>
          )}
        </div>
      </form>
    </section>
  );
};
