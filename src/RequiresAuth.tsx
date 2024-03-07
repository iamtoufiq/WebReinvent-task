import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface RequiresAuthProps {
  children: ReactNode;
}

export function RequiresAuth({
  children,
}: RequiresAuthProps): JSX.Element | null {
  let location = useLocation();
  const myLog = sessionStorage.getItem("token");
  return myLog ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
}
