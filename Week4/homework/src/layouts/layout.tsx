import { Outlet } from "react-router-dom";
import Header from "../pages/my-page/components/header";

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <div className="flex-1 flex flex-col items-center">
        <Header />
        <main className="w-xl flex-1 flex">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
