import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import PokemonDetail from "../pages/PokemonDetail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pokemon/:name",
    Component: PokemonDetail,
  },
]);

export default router;
