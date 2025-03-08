import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "../common/Container";
import { Input } from "@/components/ui/input";
import Loader from "../common/Loader";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Calendar,
} from "lucide-react";
import { getUserApplications } from "@/services/applicationServices";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

const statusColors = {
  applied: "bg-blue-500",
  reviewing: "bg-yellow-500",
  interviewing: "bg-purple-500",
  hired: "bg-green-500",
  rejected: "bg-red-500",
};

export default function AppliedJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, status, error } = useQuery({
    queryKey: ["applied-jobs"],
    queryFn: getUserApplications,
    enabled: true,
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    staleTime: 1000 * 60 * 15, // Stale for 15 minutes
  });

  if (status === "pending") {
    return (
      <div className="max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)] min-w-full">
        <Loader />
      </div>
    );
  } else if (status === "error") {
    return (
      <Container
        className={`max-w-screen-md bg-background px-8 font-semibold w-screen mx-6 py-12 `}
      >
        <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-gray-600">{error.message}</p>
        </div>
      </Container>
    );
  } else if (status === "success") {
    // console.log(data);
    return (
      <Container
        className={`max-w-screen-2xl overflow-auto capitalize font-semibold w-full lg:w-full lg:px-20 lg:mx-6 max-h-full min-h-full bg-background lg:py-12`}
      >
        <div className="px-6 my-6">
          <h1 className="text-xl rounded-full bg-primary text-background py-2 px-4 font-bold mb-4">
            Applied Jobs
          </h1>
          <div className="border px-4 py-2 bg-cyan-100 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-6 shadow-sm">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search jobs..."
                className="pl-8 mt-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="interview">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6 px-6">
          {data?.applications?.length === 0 ? (
            <div className="text-center py-12 col-span-full">
              <p className="text-xl font-semibold text-gray-600">
                No applications found
              </p>
              <p className="text-sm w-full text-gray-500 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            data?.applications
              .filter((application) => {
                if (statusFilter !== "all") {
                  return application.status.toLowerCase() === statusFilter;
                }
                return true;
              })
              .filter((application) => {
                if (searchTerm) {
                  return (
                    application.job.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    application.job.company.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  );
                }
                return true;
              })
              .map((application) => {
                const job = application?.job;
                return (
                  <Card
                    key={application._id}
                    className="flex flex-col bg-cyan-300/30 rounded-3xl shadow-sm"
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage
                          src={job?.company?.logo}
                          alt={job?.company?.name}
                        />
                        <AvatarFallback>{job?.company?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{job?.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {job?.company?.name}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow ">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {job?.location?.city}, {job?.location?.state}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job?.jobType}</span>
                        </div>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job?.workFrom}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{job?.experience}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          Applied {moment(application?.appliedAt).fromNow()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Badge
                          className={`${
                            statusColors[application?.status.toLowerCase()]
                          } text-white`}
                        >
                          {application?.status.charAt(0).toUpperCase() +
                            application?.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm font-semibold">
                        ₹{job?.salaryRange?.min} - ₹{job?.salaryRange?.max} /
                        year
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="h-screen overflow-auto sm:max-w-[425px] lg:max-w-3xl">
                          <DialogHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-14 w-14">
                              <AvatarImage
                                src={job?.company?.logo}
                                alt={job?.company?.name}
                              />
                              <AvatarFallback>
                                {job?.company?.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <DialogTitle className="text-lg">
                                {job?.title}
                              </DialogTitle>
                              <p className="text-sm text-muted-foreground">
                                {job?.company?.name}
                              </p>
                            </div>
                          </DialogHeader>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Job Description
                            </h4>
                            <p
                              className="text-sm text-gray-500 bullet_list px-8"
                              dangerouslySetInnerHTML={{
                                __html: job?.description,
                              }}
                            />
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Application Details
                            </h4>
                            <p className="text-sm text-gray-500">
                              Status: {application?.status}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied on:{" "}
                              {moment(application?.appliedAt).format(
                                "MMMM D, YYYY"
                              )}
                            </p>
                            <p className="text-sm text-gray-500">
                              Job Type: {job?.jobType}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })
          )}
        </div>
      </Container>
    );
  }
}
