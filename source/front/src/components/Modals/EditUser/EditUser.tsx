import { useState, useEffect, FC, FormEvent } from "react";
import { EditUserView } from "./EditUserView";
import { useAuth } from "@hooks/useAuth";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { FormValues, useFormValidation } from "@hooks/useFormWithValidation";
import { useEditUserMutation } from "@src/redux/services/userApi";
import { setSelectedUser } from "@src/redux/reducers/UserSlice";
import {
  INVALID_FORM,
  INVALID_PASSWORD_ERROR,
  PASSWORDS_NOT_MATCH,
  MATCHING_LOGIN_AND_PASS_ERROR,
} from "@src/utils/messages";
import { passwordRegex } from "@src/utils/regexp";
import { IUser } from "@src/types/IUser";

interface Props {
  handleClose: () => void;
}

export const EditUser: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { selectedUser } = useAppSelector((state) => state.userSlice);
  const [editUser, { data: response, isError, isSuccess, isLoading }] =
    useEditUserMutation();
  const { values, errors, isValid, handleChange, resetForm, setIsValid } =
    useFormValidation();
  const isWrite = selectedUser?.login === auth?.user?.login;
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const target = event.target;
    const form = target.closest("form");
    setIsValid(form ? form.checkValidity() : false);
  };

  const generateArgs = (formData: FormValues) => {
    //TODO: поле deleted в каких случаях true?
    const args = {
      id: String(selectedUser?.id),
      isAdmin: Boolean(isWrite ? true : false),
      family: String(formData.family),
      name: String(formData.name),
      father: String(formData.father),
      password: selectedUser?.password ?? "",
      email: String(formData.email),
      info: String(formData.info),
      deleted: !checked,
    };

    return args;
  };

  const validationFormValues = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { family, name, email, login } = formJson;
    if (!family || !name || !email || !login) {
      setMessage(INVALID_FORM);
    } else if (values.password) {
      if (!passwordRegex.test(String(values.password))) {
        setMessage(INVALID_PASSWORD_ERROR);
      } else if (values.password !== values.repeat) {
        setMessage(PASSWORDS_NOT_MATCH);
      } else if (values.password === values.login) {
        setMessage(MATCHING_LOGIN_AND_PASS_ERROR);
      }
    } else {
      setMessage("");
      changeUser(formJson);
    }
  };

  const changeUser = (formValues: FormValues) => {
    const args = generateArgs(formValues);

    editUser(args).then((res) => {
      if ("data" in res && !res.data.error) {
        dispatch(setSelectedUser({ ...(selectedUser as IUser), ...args }));
      }
    });
  };

  //Сетим в values данные поля deleted выбранного пользователя, для корректного отображения значения флага "Статус пользователя"
  useEffect(() => {
    if (selectedUser && "deleted" in selectedUser)
      setChecked(!selectedUser.deleted);
  }, [selectedUser]);

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccess && !response.error) {
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
      <EditUserView
        user={selectedUser}
        values={values}
        message={message}
        handleChange={handleChange}
        handleChecked={handleChecked}
        errors={errors}
        isValidForm={isValid}
        isLoading={isLoading}
        isErrorSave={isError}
        isSuccessSave={isSuccessSave()}
        isWrite={isWrite}
        checked={checked}
      />
    </form>
  );
};
