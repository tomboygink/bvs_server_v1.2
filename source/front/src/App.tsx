import React from "react";

import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./hooks/useAuth";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};
