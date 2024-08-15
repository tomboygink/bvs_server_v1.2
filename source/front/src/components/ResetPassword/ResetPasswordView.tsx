import { FC, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { Typography } from "@components/_shared/Typography";
import { InputText } from "@components/_shared/Inputs/InputText";
import { InputWithIcon } from "@components/_shared/Inputs/InputWithIcon";
import { Button } from "@components/_shared/Button";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { SAVE_ERROR, SAVE_SUCCESS_PASSWORD } from "@src/utils/messages";
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
export const ResetPasswordView: FC<Props> = (props) => {
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
            Сброс пароля
          </Typography>
          <Typography className={cx("subtitle")} variant="body1">
            Для сброса пароля, пожалуйста, укажите ваш логин и новый пароль.
          </Typography>
          <fieldset className={cx("fields")}>
            <InputText
              name="login"
              placeholder="Логин"
              onChange={handleChange}
              variant="standard"
              InputProps={{
                style: {
                  fontSize: 16,
                  padding: "4px 12px",
                  boxSizind: "border-box",
                },
              }}
              error={Boolean(errors.login)}
              helperText={errors.login}
            />
            <InputWithIcon
              name="new_password"
              placeholder="Новый пароль"
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <InputWithIcon
              name="repeat"
              placeholder="Повторите пароль"
              onChange={handleChange}
              error={Boolean(errors.repeat)}
              helperText={errors.repeat}
            />
          </fieldset>
          <fieldset className={cx("btn-container")}>
            {/* <Link className={cx("link")} to={ScreenRoute.LOGIN}>
              ← Вернуться на форму авторизации
            </Link> */}
            <Button disabled={!isValid} isLoading={isLoading} type="submit">
              Подтвердить
            </Button>
          </fieldset>
          {message && (
            <Alert className={cx("alert")} severity="error">
              {message}
            </Alert>
          )}
          {isSuccessSave && (
            <Alert className={cx("alert")} severity="success">
              {SAVE_SUCCESS_PASSWORD}
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
