import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  CircleAlert,
  CircleCheck,
  CircleX,
  Info,
  RefreshCw,
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";

import Layout from "./components/Dashboard/common/Layouts/Layout";
import LoginRegisterLayout from "./components/Dashboard/common/Layouts/LoginRegisterLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";

import EmployerDashboard from "@/components/Dashboard/EmployerComponents/EmployerDashboard";
import UserJobListings from "@/components/Dashboard/JobListings";
import JobOpenings from "./components/Dashboard/EmployerComponents/JobOpenings";
import Settings from "./components/Dashboard/Settings";
import Profile from "./components/Dashboard/Settings/Profile";
import AppliedJobs from "./components/Dashboard/Settings/AppliedJobs";
import Bookmarks from "./components/Dashboard/Settings/Bookmarks";
import Navbar from "./components/Dashboard/common/Navbar";
import Loader from "./components/Dashboard/common/Loader";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import RoleBasedRoute from "./ProtectedRoutes/RoleBasedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && !location.pathname.startsWith("/dashboard")) {
      navigate(`/dashboard/${user?.role}`);
    }
  }, [isAuthenticated, user, navigate, location]);

  if (isLoading)
    return (
      <div className="max-h-screen h-screen w-screen">
        <div className="w-full h-full bg-black/10 flex flex-col gap-5 items-center justify-center">
          <RefreshCw className="animate-spin h-14 w-14 stroke-primary/60" />
          <p className="text-primary/70 text-center font-semibold underline">
            Loading... Please be patient, the backend server is starting up and
            may take a minute.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LoginRegisterLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={`/dashboard/${user?.role}`} replace />}
          />

          <Route
            path="jobSeeker"
            element={
              <RoleBasedRoute allowedRole="jobSeeker">
                <Dashboard />
              </RoleBasedRoute>
            }
          >
            <Route index element={<UserJobListings />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>

          <Route
            path="recruiter"
            element={
              <RoleBasedRoute allowedRole="recruiter">
                <Dashboard />
              </RoleBasedRoute>
            }
          >
            <Route index element={<EmployerDashboard />} />
            <Route path="job-openings" element={<JobOpenings />} />
          </Route>

          <Route path="settings" element={<Settings />}>
            <Route index element={<Profile />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="applied-jobs" element={<AppliedJobs />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<div>Unauthorized</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
      <Toaster
        icons={{
          success: <CircleCheck />,
          info: <Info />,
          warning: <CircleAlert />,
          error: <CircleX />,
          loading: <Loader />,
        }}
      />
    </>
  );
}

export default App;
