import { FC, ChangeEvent } from "react";
import { Alert } from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { IUser } from "@src/types/IUser";
import { FormErrors } from "@hooks/useFormWithValidation";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  user: IUser | null | undefined;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  errors: FormErrors;
  message: string;
  isErrorSave: boolean;
  isLoading: boolean;
  isSuccessSave: boolean;
}
export const EditProfileView: FC<Props> = (props) => {
  const {
    user,
    handleChange,
    errors,
    message,
    isErrorSave,
    isLoading,
    isSuccessSave,
  } = props;
  const cx = useStyles(styles);

  return (
    <>
      <div className={cx("container")}>
        <InputText
          name="family"
          label="Фамилия"
          //defaultValue={user?.family}
          defaultValue={user?.family}
          onChange={handleChange}
          error={Boolean(errors.family)}
          helperText={errors.family}
        />
        <InputText
          name="name"
          label="Имя"
          defaultValue={user?.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <InputText
          name="father"
          label="Отчество"
          required={false}
          defaultValue={user?.father}
          onChange={handleChange}
          error={Boolean(errors.father)}
          helperText={errors.father}
        />
        <InputText
          name="email"
          label="E-mail"
          type="email"
          defaultValue={user?.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        {/* <Switch
          name="act_mail"
          label={`${
            user?.act_mail
              ? "Электронная почта подтверждена"
              : "Электронная почта не подтверждена"
          }`}
          defaultChecked={user?.act_mail}
          disabled
        /> */}
        <InputText
          name="info"
          label="Дополнительная информация"
          required={false}
          multiline={true}
          rows={4}
          defaultValue={user?.info}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
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
        <Button isLoading={isLoading}>Сохранить</Button>
      </div>
    </>
  );
};
