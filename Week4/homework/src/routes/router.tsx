import { createBrowserRouter } from "react-router";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import MyPage from "../pages/my-page";

export const router = createBrowserRouter([
  {
    path: "/my-page",
    element: <MyPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
