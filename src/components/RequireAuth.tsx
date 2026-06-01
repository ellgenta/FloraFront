import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  if (!getToken()) {
    return (
      <Navigate
        to="/register"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}