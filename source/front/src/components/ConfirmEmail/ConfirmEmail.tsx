import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useConfirmEmailMutation } from "@src/redux/services/userApi";
import { ConfirmEmailView } from "./ConfirmEmailView";
import { ScreenRoute } from "@src/types/Screen.routes.enum";
import { setUser } from "@src/redux/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { IUser } from "@src/types/IUser";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useAuth } from "@hooks/useAuth";

export const ConfirmEmail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = useAppSelector((state) => state.userSlice);
  const [useLS, setUserLS] = useLocalStorage("user", null);
  const [message, setMessage] = useState("");
  const [confirmEmail, { data: response, isLoading, isError, isSuccess }] =
    useConfirmEmailMutation();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const generateArgs = () => {
    const args = {
      code: code ?? "",
      email: auth?.user?.email ?? "",
    };
    return args;
  };
  const handleConfirm = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    confirmEmail(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  useEffect(() => {
    if (isSuccess && !response.error) {
      dispatch(setUser({ ...(user as IUser), act_mail: true }));
      //TODO: проверить, обновляется ли в компоненте EditProfile currentUser
      setUserLS({ ...useLS, act_mail: true });
      navigate(ScreenRoute.MAIN);
      setTimeout(() => {}, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  console.log("auth", auth);
  return (
    <ConfirmEmailView
      handleSubmit={handleConfirm}
      message={message}
      isErrorSave={isError}
      isLoading={isLoading}
      isSuccessSave={isSuccessSave()}
    />
  );
};
