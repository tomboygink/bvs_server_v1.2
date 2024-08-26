import { FormEvent, useState, useEffect } from "react";
import { LoginView } from "./LoginView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { IQuery } from "@src/types/IQuery";
import { useStyles } from "@hooks/useStyles";
import { useAppDispatch } from "@hooks/redux";
import { useAuthMutation } from "@src/redux/services/authApi";
import { setUser, setCode, authChecked } from "@src/redux/reducers/UserSlice";
import { useAuth } from "@hooks/useAuth";
import styles from "./styles.module.scss";
import { ECOMMAND } from "@src/types/ECommand";

export const Login = () => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const { values, errors, isValid, resetForm, handleChange } =
    useFormValidation();
  const [authorization, { data: response, isSuccess, isError, isLoading }] =
    useAuthMutation();
  const auth = useAuth();

  const generateArgs = () => {
    const args = {
      ...values,
    };
    return args;
  };
  const login = (e: FormEvent) => {
    e.preventDefault();
    const args = generateArgs();
    const query: IQuery = {
      cmd: ECOMMAND.GETUSERBYLOGIN,
      sess_code: "",
      args,
    };
    authorization(query).then((response): void => {
      if ("data" in response) {
        auth?.login(response);
        dispatch(setUser(response.data.data?.[0]));
        dispatch(setCode(response.data.user_sess_code));
        dispatch(authChecked(true));
      }
    });
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccessSave()) {
      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <form className={cx("form")} onSubmit={login} noValidate>
      <LoginView
        onChange={handleChange}
        message={message}
        errors={errors}
        isValid={isValid}
        isErrorSave={isError}
        isLoading={isLoading}
      />
    </form>
  );
};
