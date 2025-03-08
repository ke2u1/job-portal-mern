import { fetchJobs } from "@/services/JobServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const setFilter = (newFilters) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const key in newFilters) {
      if (newFilters[key] === "" || newFilters[key] === null) {
        updatedSearchParams.delete(key);
      } else {
        updatedSearchParams.set(key, newFilters[key]);
      }
    }
    setSearchParams(updatedSearchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filters = Object.fromEntries(
    new URLSearchParams(searchParams.toString()).entries()
  );

  const jobQuery = useInfiniteQuery({
    queryKey: ["jobs", filters],
    queryFn: ({ pageParam = null }) =>
      fetchJobs({ ...filters, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    keepPreviousData: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 5000,
    enabled: user?.role === "jobSeeker",
  });

  return {
    jobQuery,
    filters,
    setFilter,
    clearFilters,
  };
};
