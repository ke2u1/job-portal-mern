import { Outlet } from "react-router-dom";
import Sidebars from "../Sidebars";

const Layout = () => {
  return (
    <div className="bg-muted flex flex-row flex-1 lg:max-h-screen lg:overflow-hidden max-w-screen lg:w-full xl:pl-4">
      <Sidebars />
      <main className="flex-1 overflow-auto lg:overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
