import Home from "@/pages/landing_page";
import Navbar from "@/components/navbar";
import CreateAccount from "@/pages/auth/create_account/account_details";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFound from "@/components/not_found";

export const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
