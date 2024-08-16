import { FC, ChangeEvent, useState } from "react";
import {
  TextareaAutosize,
  Alert,
  Stack,
  Typography,
  Switch,
  FormControl,
  FormLabel,
} from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { RadioButton } from "@components/_shared/RadioButton";
import { IUser } from "@src/types/IUser";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";

//import { Switch } from "@components/_shared/Switch";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  user: IUser | null;
  values: FormValues;
  message: string;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
  isValidForm: boolean;
  isLoading: boolean;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isWrite: boolean;
  checked: boolean;
}
export const EditUserView: FC<Props> = ({
  user,

  message,
  handleChange,
  handleChecked,
  errors,
  isValidForm,
  isLoading,
  isSuccessSave,
  isErrorSave,
  isWrite,
  checked,
}) => {
  const cx = useStyles(styles);

  return (
    <>
      <div className={cx("container")}>
        <InputText
          onChange={handleChange}
          //value={values.family || ""}
          defaultValue={user?.family || ""}
          name="family"
          label="Фамилия"
          error={Boolean(errors.family)}
          helperText={errors.family}
        />
        <InputText
          name="name"
          onChange={handleChange}
          defaultValue={user?.name || ""}
          //value={values.name || ""}
          error={Boolean(errors.name)}
          label="Имя"
          helperText={errors.name}
        />

        <InputText
          onChange={handleChange}
          defaultValue={user?.father || ""}
          //value={values.father || ""}
          required={false}
          name="father"
          label="Отчество"
          error={Boolean(errors.father)}
          helperText={errors.father}
        />
        <InputText
          onChange={handleChange}
          defaultValue={user?.email || ""}
          //value={values.email || ""}
          name="email"
          label="E-mail"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <InputText
          onChange={handleChange}
          defaultValue={user?.login || ""}
          InputProps={{
            readOnly: true,
            style: { fontSize: 12, opacity: "0.5" },
          }}
          name="login"
          label="Логин"
          error={Boolean(errors.login)}
          helperText={errors.login}
        />
        {!isWrite && (
          <>
            <InputText
              onChange={handleChange}
              name="password"
              label="Новый пароль"
              type="password"
              placeholder="Не менее 6 знаков, включая буквы, цифры и спец.символы"
              error={Boolean(errors.newPassword)}
              helperText={errors.password}
              required={false}
            />

            <InputText
              onChange={handleChange}
              name="repeat"
              label="Повторите пароль"
              type="password"
              error={Boolean(errors.repeat)}
              helperText={errors.repeat}
              required={false}
            />
          </>
        )}
        <FormControl>
          <FormLabel sx={{ fontSize: "12px" }}>Статус пользователя</FormLabel>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontSize: "12px" }}>Закрытый</Typography>
            <Switch checked={checked} name="deleted" onChange={handleChecked} />
            <Typography sx={{ fontSize: "12px" }}>Действующий</Typography>
          </Stack>
        </FormControl>

        {/* <RadioButton
          defaultValue={user?.deleted ? true : false}
          onChange={handleChange}
          name="deleted"
        /> */}

        <TextareaAutosize
          name="info"
          minRows={4}
          className="info"
          onChange={handleChange}
          defaultValue={user?.info || ""}
          //value={values.info || ""}
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
        <Button isLoading={isLoading} disabled={!isValidForm}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
