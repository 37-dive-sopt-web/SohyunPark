import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
