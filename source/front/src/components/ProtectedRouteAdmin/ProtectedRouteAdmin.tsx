import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useAuthBySessionCodeQuery } from "@src/redux/services/authApi";

interface Props {
  children?: ReactNode;
}

export const ProtectedRouteAdmin: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  const { data: userBySessionCode, isSuccess } = useAuthBySessionCodeQuery({
    code: auth?.code,
  });
  useEffect(() => {
    if (isSuccess && userBySessionCode.error) {
      auth?.logout();
      return;
    }
  }, [userBySessionCode, isSuccess]);
  if (!auth || !auth.user || auth?.user?.roles_ids.roles[1] !== 2) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
