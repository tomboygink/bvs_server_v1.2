import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordView } from "./ResetPasswordView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useResetPasswordMutation } from "@src/redux/services/userApi";
import {
  PASSWORDS_NOT_MATCH,
  MATCHING_LOGIN_AND_PASS_ERROR,
} from "@src/utils/messages";
import { ScreenRoute } from "@src/types/Screen.routes.enum";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();
  const [message, setMessage] = useState("");
  const [resetPassword, { data: response, isError, isLoading, isSuccess }] =
    useResetPasswordMutation();
  const generateArgs = () => {
    const args = {
      ...values,
    };
    return args;
  };
  const validationForm = (event: FormEvent) => {
    event.preventDefault();

    if (values.new_password !== values.repeat) {
      setMessage(PASSWORDS_NOT_MATCH);
    } else if (values.login === values.new_password) {
      setMessage(MATCHING_LOGIN_AND_PASS_ERROR);
    } else {
      setMessage("");
      sendCode();
    }
  };
  const sendCode = () => {
    const args = generateArgs();
    resetPassword(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccess && !response.error) {
      setTimeout(() => {
        resetForm();
        navigate(ScreenRoute.LOGIN);
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <ResetPasswordView
      errors={errors}
      isValid={isValid}
      handleChange={handleChange}
      message={message}
      isErrorSave={isError}
      isLoading={isLoading}
      isSuccessSave={isSuccessSave()}
      handleSubmit={validationForm}
    />
  );
};
