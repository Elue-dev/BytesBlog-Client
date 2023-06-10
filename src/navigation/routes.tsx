import { lazy, Suspense } from "react";
const Home = lazy(() => import("@/pages/landing_page"));
const Navbar = lazy(() => import("@/components/navbar"));
const CreateAccount = lazy(
  () => import("@/pages/auth/create_account/account_details")
);
const NotFound = lazy(() => import("@/components/not_found"));
const ScrollToTop = lazy(() => import("@/utils/scrollToTop"));
const SignIn = lazy(() => import("@/pages/auth/sign_in"));
const ForgotPassword = lazy(() => import("@/pages/auth/forgot_password"));
const ResetPassword = lazy(() => import("@/pages/auth/reset_password"));
const Modal = lazy(() => import("@/components/modal"));
const Blog = lazy(() => import("@/pages/blog/home"));
const PostDetails = lazy(() => import("@/pages/blog/post_details"));
const Profile = lazy(() => import("@/pages/profile"));
const ManageInterests = lazy(() => import("@/pages/manage_interests"));
const AddPost = lazy(() => import("@/pages/add_post"));
const Alert = lazy(() => import("@/components/alert"));
const Authenticated = lazy(() => import("@/helpers/authenticated"));
const Unauthenticated = lazy(() => import("@/helpers/unauthenticated"));
const PostSearch = lazy(() => import("@/pages/blog/home/posts/post_query"));
const OfflinePage = lazy(() => import("@/pages/offline_page"));
import { createBrowserRouter, Outlet } from "react-router-dom";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import Spinner from "@/components/spinners";

export const Layout = () => {
  const status = useNetworkStatus();

  return (
    <div className="app">
      {!status ? (
        <OfflinePage />
      ) : (
        <Suspense fallback={<Spinner />}>
          <Navbar />
          <Outlet />
          <ScrollToTop />
          <Modal />
          <Alert />
        </Suspense>
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
