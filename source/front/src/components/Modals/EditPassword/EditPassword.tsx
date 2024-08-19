import { useState, useEffect, FormEvent } from "react";
import { EditPasswordView } from "./EditPasswordView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useEditPasswordMutation } from "@src/redux/services/userApi";
export const EditPassword = () => {
  const { values, errors, handleChange, isValid } = useFormValidation();
  const [message, setMessage] = useState("");
  const [editPassword, { data: response, isError, isLoading, isSuccess }] =
    useEditPasswordMutation();
  const validationForm = (e: FormEvent) => {
    e.preventDefault();
    console.log("values", values);
  };
  return (
    <form onSubmit={validationForm} noValidate>
      <EditPasswordView
        message={message}
        handleChange={handleChange}
        isValid={isValid}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccess}
      />
    </form>
  );
};
