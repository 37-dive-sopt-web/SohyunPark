import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import { UserProvider } from "./context/user-provider";

function App() {
  return (
    <UserProvider>
      <div className="flex justify-center">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  );
}

export default App;
