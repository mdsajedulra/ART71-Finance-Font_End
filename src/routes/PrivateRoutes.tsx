import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { type ReactNode } from "react";

import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default PrivateRoutes;
