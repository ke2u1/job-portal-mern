import { Outlet } from "react-router-dom";
import Loader from "@/components/Dashboard/common/Loader";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <Suspense
      fallback={
        <div className="absolute h-screen w-screen blur flex items-center">
          <Loader />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default Dashboard;
