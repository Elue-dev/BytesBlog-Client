import Home from "@/pages/landing_page";
import Navbar from "@/components/navbar";
import CreateAccount from "@/pages/auth/create_account/account_details";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFound from "@/components/not_found";
import ScrollToTop from "@/utils/scrollToTop";
import SignIn from "@/pages/auth/sign_in";
import ForgotPassword from "@/pages/auth/forgot_password";
import ResetPassword from "@/pages/auth/reset_password";

export const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <ScrollToTop />
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
        path: "/auth/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
