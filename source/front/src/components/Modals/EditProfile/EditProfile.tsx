import { useState, useEffect, FormEvent, FC } from "react";
import {
  useEditUserMutation,
  useSendEmailMutation,
} from "@src/redux/services/userApi";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAuth } from "@hooks/useAuth";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { EditProfileView } from "./EditProfileView";
import { FormValues } from "@hooks/useFormWithValidation";
import { INVALID_FORM } from "@src/utils/messages";
import { useModal } from "@hooks/useModal";
import { SendEmail } from "./components/ConfirmEmail";
import { IUser } from "@src/types/IUser";
import { useAppDispatch } from "@hooks/redux";
import { setUser } from "@src/redux/reducers/UserSlice";

interface Props {
  handleClose: () => void;
}

export const EditProfile: FC<Props> = ({ handleClose }) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const [_, setUserLS] = useLocalStorage("user", null);
  const [countCallSendEmail, setCountSendEmail] = useState(0);
  const [open, openModal, closeModal] = useModal();
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(
    auth?.user as IUser
  );
  const currentUser = JSON.parse(localStorage.getItem("user") ?? ""); // Данные пользователя достаем из локального хранилища
  const { errors, handleChange, resetForm } = useFormValidation();
  const [editUser, { data: response, isError, isSuccess, isLoading }] =
    useEditUserMutation();
  const [
    sendEmail,
    { isLoading: isLoadingSendEmail, isSuccess: isSuccessSendEmail },
  ] = useSendEmailMutation();
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
    }
    //Если почта не подтверждена - отправляем запрос на получение кода активации по почте
    else if (!auth?.user?.act_mail) {
      sendEmailFc();
      openModal();
      //Если форма валидна и почта подтверждена - отправляем запрос на изменение данных пользователя
    } else {
      setMessage("");
      changeUser(formJson);
    }
  };

  const changeUser = (formValues: FormValues) => {
    const args = generateArgs(formValues);
    dispatch(setUser({ ...(updatedUser as IUser), ...args }));
    //Сохраняем текущие данные в переменную состояния
    setUpdatedUser({ ...(updatedUser as IUser), ...args });
    editUser(args);
  };

  const sendEmailFc = () => {
    sendEmail({
      login: auth?.user?.login ?? "",
      email: auth?.user?.email ?? "",
    });
    setCountSendEmail(countCallSendEmail + 1);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (auth && "user" in auth) {
      dispatch(setUser(auth?.user as IUser));
    }
  }, [auth]);

  //Если изменение прошло успешно, то сохраняем текущие данные в локальное хранилище, закрываем форму
  useEffect(() => {
    if (isSuccess && !response.error) {
      setUserLS(updatedUser);
      dispatch(setUser(updatedUser as IUser));
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
    <>
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
      <SendEmail
        open={open}
        isLoading={isLoadingSendEmail}
        isDisabled={isSuccessSendEmail && countCallSendEmail > 1}
        handleClose={closeModal}
        repeatSendEmail={sendEmailFc}
        email={auth?.user?.email ?? ""}
        textButton={
          isSuccessSendEmail && countCallSendEmail > 1
            ? "Отправлено ✓"
            : "Отправить код ещё раз"
        }
        count={countCallSendEmail}
      />
    </>
  );
};
