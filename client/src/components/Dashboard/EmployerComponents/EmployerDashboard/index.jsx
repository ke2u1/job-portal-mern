import { Briefcase, ChartLine, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecruiterDashboard } from "@/services/applicationServices";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../../ui/skeleton";
import { toast } from "sonner";
import { useState } from "react";
import Resume from "../../common/Resume";
import RecentApplications from "./RecentApplications";
import RecentJobPostings from "./RecentJobPostings";

const EmployerDashboard = () => {
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const { data, error, status } = useQuery({
    queryKey: ["recruiter-dashboard"],
    queryFn: getRecruiterDashboard,
    retry: 3,
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    staleTime: 1000 * 60 * 100, // Data is fresh for 2 minutes
  });

  const handleSelectApplicant = (applicantId) => {
    setSelectedApplicantId(applicantId);
  };

  if (status === "pending") {
    return (
      <div className="bg-gray-100 overflow-hidden h-[calc(100vh-8vh)]">
        <main className="mx-auto h-full px-4 flex flex-col sm:flex-row justify-between sm:px-6 lg:px-8 py-8 gap-8">
          <div className="max-h-full h-full w-full">
            <div className="grid grid-cols-1 gap-6 font-grotesk md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
            </div>

            <div className="mt-8 max-h-[600px] h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
              <Skeleton className="bg-black/20 rounded-3xl h-[550px] " />
              <Skeleton className="bg-black/20 rounded-3xl h-[550px] " />
            </div>
          </div>
          <div className="row-span-2 w-full sm:w-80">
            <Skeleton className="h-full w-full rounded-3xl bg-black/20" />
          </div>
        </main>
      </div>
    );
  } else if (status === "success") {
    const {
      activeJobsCount,
      totalApplications,
      totalInterviews,
      newApplications,
      recentJobs,
      recentApplications,
    } = data;

    return (
      <div className="xl:overflow-hidden max-h-full h-[calc(100vh-8vh)]">
        <main className="mx-auto h-full gap-0.5 flex flex-row justify-between sm:px-6 lg:px-8 py-8 lg:gap-8">
          <div className="max-h-full h-full w-full">
            <div className="grid h-fit grid-cols-2 gap-2 lg:gap-6 font-grotesk md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-lg bg-orange-500 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <Briefcase className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Active Jobs
                  </CardTitle>
                  <div className="text-3xl font-bold">{activeJobsCount}</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-purple-600/20 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <FileText className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Total Applications
                  </CardTitle>
                  <div className="text-2xl font-bold">{totalApplications}</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-foreground h-40 text-secondary font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <Users className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Interviews
                  </CardTitle>
                  <div className="text-2xl font-bold">{totalInterviews}</div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-cyan-400 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <FileText className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    New Applications
                  </CardTitle>
                  <div className="text-2xl font-bold">{newApplications}</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 pb-24 lg:pb-0 lg:h-[600px] grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RecentJobPostings recentJobs={recentJobs} />
              <RecentApplications
                onSelectApplicant={handleSelectApplicant}
                recentApplications={recentApplications}
              />
            </div>
          </div>
          <div className="hidden xl:block lg:row-span-2">
            <Resume
              /* user={user} */
              userId={selectedApplicantId}
              className={"w-full max-w-96"}
            />
          </div>
        </main>
      </div>
    );
  } else if (status === "error") {
    toast.error("Error:", {
      description: error.message,
    });
  }
};

export default EmployerDashboard;
