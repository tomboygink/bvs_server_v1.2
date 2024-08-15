import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useAuthBySessionCodeQuery } from "@src/redux/services/authApi";

interface Props {
  children?: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
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
  if (!auth || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

//  const auth = useAuth();

//  if (!auth || !auth.user) {
//    return <Navigate to="/login" replace />;
//  }

//  return children;
