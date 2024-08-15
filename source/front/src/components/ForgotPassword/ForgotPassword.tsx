import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordView } from "./ForgotPasswordView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useSendResetPasswordCodeMutation } from "@src/redux/services/userApi";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();
  const [message, setMessage] = useState("");
  const [
    sendResetPasswordCode,
    { data: response, isError, isLoading, isSuccess },
  ] = useSendResetPasswordCodeMutation();
  const generateArgs = () => {
    const args = {
      email: String(values.email),
    };
    return args;
  };
  const sendCode = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    sendResetPasswordCode(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccess && !response.error) {
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);
  return (
    <ForgotPasswordView
      errors={errors}
      isValid={isValid}
      handleChange={handleChange}
      message={message}
      isErrorSave={isError}
      isLoading={isLoading}
      isSuccessSave={isSuccessSave()}
      handleSubmit={sendCode}
    />
  );
};
