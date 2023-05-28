import Home from "@/pages/landing_page";
import Navbar from "@/components/navbar";
import CreateAccount from "@/pages/auth/create_account/account_details";
import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFound from "@/components/not_found";
import ScrollToTop from "@/utils/scrollToTop";
import SignIn from "@/pages/auth/sign_in";
import ForgotPassword from "@/pages/auth/forgot_password";
import ResetPassword from "@/pages/auth/reset_password";
import Modal from "@/components/modal";
import Blog from "@/pages/blog/home";
import PostDetails from "@/pages/blog/post_details";
import Profile from "@/pages/profile";
import ManageInterests from "@/pages/manage_interests";
import RichEditor from "@/components/editor";
import AddPost from "@/pages/add_post";
import Alert from "@/components/alert";

export const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <ScrollToTop />
      <Modal />
      <Alert />
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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/post/:postId",
        element: <PostDetails />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/user/manage-interests",
        element: <ManageInterests />,
      },
      {
        path: "/blog/write",
        element: <AddPost />,
      },
      {
        path: "/editor",
        element: <RichEditor />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
