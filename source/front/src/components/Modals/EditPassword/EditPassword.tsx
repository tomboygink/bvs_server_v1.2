import { useState, useEffect, FormEvent, FC } from "react";
import { EditPasswordView } from "./EditPasswordView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useEditPasswordMutation } from "@src/redux/services/userApi";
import { useAuth } from "@hooks/useAuth";
import { passwordRegex } from "@src/utils/regexp";
import {
  INVALID_PASSWORD_ERROR,
  MATCHING_LOGIN_AND_PASS_ERROR,
  PASSWORDS_NOT_MATCH,
  MATCHING_OLD_PASSWORD_ERROR,
} from "@src/utils/messages";

interface Props {
  handleClose: () => void;
}
export const EditPassword: FC<Props> = ({ handleClose }) => {
  const auth = useAuth();
  const { values, errors, handleChange, isValid, resetForm } =
    useFormValidation();
  const [message, setMessage] = useState("");
  const [editPassword, { data: response, isError, isLoading, isSuccess }] =
    useEditPasswordMutation();
  const generateArgs = () => {
    const args = {
      ...values,
      id: auth?.user?.id || "",
      login: auth?.user?.login || "",
    };
    return args;
  };
  const validationForm = (e: FormEvent) => {
    e.preventDefault();
    if (!passwordRegex.test(String(values.new_password))) {
      setMessage(INVALID_PASSWORD_ERROR);
    } else if (values.new_password !== values.confirm) {
      setMessage(PASSWORDS_NOT_MATCH);
    } else if (values.new_password === auth?.user?.login) {
      setMessage(MATCHING_LOGIN_AND_PASS_ERROR);
    } else if (values.new_password === values.old_password) {
      setMessage(MATCHING_OLD_PASSWORD_ERROR);
    } else {
      changePassword();
    }
  };

  const changePassword = () => {
    const args = generateArgs();
    editPassword(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccessSave()) {
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
    <form onSubmit={validationForm} noValidate>
      <EditPasswordView
        errors={errors}
        message={message}
        handleChange={handleChange}
        isValid={isValid}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccessSave()}
      />
    </form>
  );
};
