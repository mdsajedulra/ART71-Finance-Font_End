import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
