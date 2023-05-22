import Home from "@/pages/landing_page";
import Navbar from "@/components/navbar";
import CreateAccount from "@/pages/auth/create_account/account_details";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFound from "@/components/not_found";
import ScrollToTop from "@/utils/scrollToTop";
import SignIn from "@/pages/auth/sign_in";

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
        path: "/create-account",
        element: <CreateAccount />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
