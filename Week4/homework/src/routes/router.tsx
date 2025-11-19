import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import Layout from "../layouts/layout";
import MyPage from "../pages/my-page/my-page";
import SignIn from "../pages/sign-in/sign-in";
import SignUp from "../pages/sign-up/sign-up";
import Members from "../pages/my-page/members";
import { PATH } from "../constants/paths";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: PATH.SIGN_IN, element: <SignIn /> },
      { path: PATH.SIGN_UP, element: <SignUp /> },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: PATH.MY_PAGE,
        children: [
          { index: true, element: <MyPage /> },
          { path: "members", element: <Members /> },
        ],
      },
    ],
  },
]);
