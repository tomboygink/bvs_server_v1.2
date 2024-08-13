import { useState, useEffect, FormEvent, FC } from "react";
import { useEditUserMutation } from "@src/redux/services/userApi";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAuth } from "@hooks/useAuth";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { setUser, setCode, authChecked } from "@src/redux/reducers/UserSlice";
import { EditProfileView } from "./EditProfileView";
import { FormValues } from "@hooks/useFormWithValidation";
import { INVALID_FORM } from "@src/utils/messages";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { IUser } from "@src/types/IUser";
interface Props {
  handleClose: () => void;
}

export const EditProfile: FC<Props> = ({ handleClose }) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [_, setUser] = useLocalStorage("user", null);
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(
    auth?.user as IUser
  );
  const currentUser = JSON.parse(localStorage.getItem("user") ?? ""); // Данные пользователя достаем из локального хранилища
  const { errors, handleChange, resetForm } = useFormValidation();
  const [editUser, { data: response, isError, isSuccess, isLoading }] =
    useEditUserMutation();
  const [message, setMessage] = useState("");

  const generateArgs = (values: FormValues) => {
    const args = {
      id: String(auth?.user?.id) ?? "",
      isAdmin: true,
      family: String(values.family),
      name: String(values.name),
      father: String(values.father),
      email: String(values.email),
      info: String(values.info),
    };
    return args;
  };

  const validationFormValues = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { family, name, email } = formJson;
    if (!family || !name || !email) {
      setMessage(INVALID_FORM);
    } else {
      setMessage("");
      changeUser(formJson);
    }
  };

  const changeUser = (formValues: FormValues) => {
    const args = generateArgs(formValues);
    //dispatch(setUser({ ...updatedUser, ...args }));
    //Сохраняем текущие данные в переменную состояния
    setUpdatedUser({ ...(updatedUser as IUser), ...args });
    editUser(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  //Если изменение прошло успешно, то сохраняем текущие данные в локальное хранилище, закрываем форму
  useEffect(() => {
    if (isSuccess && !response.error) {
      setUser(updatedUser);
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <form onSubmit={validationFormValues} noValidate>
      <EditProfileView
        user={currentUser}
        errors={errors}
        handleChange={handleChange}
        message={message}
        isLoading={isLoading}
        isErrorSave={isError}
        isSuccessSave={isSuccessSave()}
      />
    </form>
  );
};
