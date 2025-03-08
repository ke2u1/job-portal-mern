import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, logoutUser } from "@/services/authServices";
import { fetchCurrentUser } from "@/services/userServices";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";

// Zustand store for persisting auth state

// React Query hook for auth operations
export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const clearAuthState = () => {
    localStorage.removeItem("isAuthenticated");
    queryClient.clear();
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };

  const updateAuthState = (isAuthenticated) => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  };

  const isAuthenticated = !!JSON.parse(localStorage.getItem("isAuthenticated"));

  const {
    isLoading,
    error,
    data,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: isAuthenticated,
    onSuccess: () => {
      console.log("loggedIn");
      updateAuthState(true);
    },
    onError: (error) => {
      console.log("currentUser fetching error", error);
      clearAuthState();
      toast.error("Session expired. Please log in again.");
    },
    retry: 3,
    retryDelay: 1000,
    cacheTime: 1000 * 60 * 15, // Cache for 15 minutes
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });

  /* useEffect(() => {
    if (isAuthenticated && data.user && !isLoading) {
      navigate(`/dashboard/${data.user?.role}`);
    }
  }, [isAuthenticated]); */

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      updateAuthState(true);
    },
    onError: (error) => {
      updateAuthState(false);
      console.log(error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(
        "Successfully registered! Check your email to verify your account."
      );
    },
    onError: (error) => toast.error(`Registration Error: ${error.message}`),
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuthState();
      queryClient.removeQueries(["currentUser"]); // Remove the currentUser query from the cache
      navigate("/");
    },
    onError: (error) => {
      toast.error("Logout failed! retry");
      console.error("Logout error:", error);
      // Even if logout fails on the server, clear local state
      /*  setIsAuthenticated(false);
      queryClient.clear();
      axiosInstance.defaults.headers.common["Authorization"] = "";
      navigate("/login"); */
    },
  });

  return {
    user: data?.user,
    isLoading,
    error,
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")),
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
    refetchUser,
  };
};
