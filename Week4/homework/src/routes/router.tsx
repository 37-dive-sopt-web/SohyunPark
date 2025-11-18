import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import Layout from "../layouts/layout";
import MyPage from "../pages/my-page";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
  {
    element: <Layout />,
    children: [{ path: "/my-page", element: <MyPage /> }],
  },
]);
