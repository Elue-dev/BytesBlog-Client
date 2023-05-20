import Home from "@/components/home";
import Navbar from "@/components/navbar";
import { createBrowserRouter, Outlet } from "react-router-dom";

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
        path: "/about",
        element: <div>About</div>,
      },
    ],
  },
]);

export default router;
