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
import AddPost from "@/pages/add_post";
import Alert from "@/components/alert";
import Authenticated from "@/helpers/authenticated";
import Unauthenticated from "@/helpers/unauthenticated";
import PostSearch from "@/pages/blog/home/posts/post_query";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import OfflinePage from "@/pages/offline_page";

export const Layout = () => {
  const status = useNetworkStatus();

  return (
    <div className="app">
      {status ? (
        <OfflinePage />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <ScrollToTop />
          <Modal />
          <Alert />
        </>
      )}
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
        element: (
          <Unauthenticated>
            <CreateAccount />
          </Unauthenticated>
        ),
      },
      {
        path: "/auth/sign-in",
        element: (
          <Unauthenticated>
            <SignIn />
          </Unauthenticated>
        ),
      },
      {
        path: "/auth/forgot-password",
        element: (
          <Unauthenticated>
            <ForgotPassword />
          </Unauthenticated>
        ),
      },
      {
        path: "/auth/reset-password/:token",
        element: (
          <Unauthenticated>
            <ResetPassword />
          </Unauthenticated>
        ),
      },
      {
        path: "/blog",
        element: (
          <Authenticated>
            <Blog />
          </Authenticated>
        ),
      },
      {
        path: "/blog/post/:slug/:postId",
        element: (
          <Authenticated>
            <PostDetails />
          </Authenticated>
        ),
      },
      {
        path: "/blog/posts_search",
        element: (
          <Authenticated>
            <PostSearch />
          </Authenticated>
        ),
      },
      {
        path: "/user/profile",
        element: (
          <Authenticated>
            <Profile />
          </Authenticated>
        ),
      },
      {
        path: "/user/manage-interests",
        element: (
          <Authenticated>
            <ManageInterests />
          </Authenticated>
        ),
      },
      {
        path: "/blog/write",
        element: (
          <Authenticated>
            <AddPost />
          </Authenticated>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
