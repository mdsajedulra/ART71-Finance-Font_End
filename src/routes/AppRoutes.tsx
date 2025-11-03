import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
