import Loader from "../common/Loader";
import Resume from "../common/Resume";
import { Outlet } from "react-router-dom";
import { memo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserCircle } from "lucide-react";

const Settings = () => {
  const { user, isLoading, error } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (error) return <div className="text-3xl text-red-500">Error:{error}</div>;

  return (
    <div className="flex relative lg:flex-row flex-1 max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)] w-full py-4 mb-24 lg:mb-0 ">
      {isLoading ? (
        <div className="h-screen flex w-screen items-center justify-center">
          <Loader color="#000000" size={100} />
        </div>
      ) : (
        <div className="flex lg:flex-row w-full">
          <div className="flex w-full">
            <Outlet />
          </div>
          {isMobile ? (
            <Dialog>
              <DialogTrigger className="absolute rounded-full bg-muted bottom-24 right-0 border">
                <UserCircle size={50} />
              </DialogTrigger>
              <DialogContent className="h-screen max-h-screen p-0 overflow-auto">
                <Resume isLoading={isLoading} user={user} />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-96">
              <Resume isLoading={isLoading} user={user} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Settings);
