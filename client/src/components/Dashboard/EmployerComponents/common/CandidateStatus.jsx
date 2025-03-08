import { ArrowRight, Check, Clock, Mail, Phone, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { fetchUserById } from "@/services/userServices";
import { toast } from "sonner";
import { updateApplicationStatus } from "@/services/applicationServices";
import Loader from "../../common/Loader";

const CandidateStatus = ({
  open,
  setOpen,
  candidateId,
  applicationId,
  status,
}) => {
  const steps = [
    { number: 1, title: "applied" },
    { number: 2, title: "reviewing" },
    { number: 3, title: "interview" },
    { number: 4, title: "hired" },
  ];

  const getStepNumberFromStatus = (status) => {
    const step = steps.find((step) => step.title === status);
    return step ? step.number : 1;
  };

  const [activeStep, setActiveStep] = useState(() =>
    getStepNumberFromStatus(status)
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["candiate-status", candidateId],
    queryFn: () => fetchUserById(candidateId),
    enabled: !!candidateId && open,
  });

  const queryClient = useQueryClient();

  const { mutate: changeCandidateStatus, isPending } = useMutation({
    mutationFn: ({ applicationId, newStatus }) =>
      updateApplicationStatus(applicationId, newStatus),
    onSuccess: (updated) => {
      if (updated && updated.status) {
        toast.success("Success!", {
          description: `Status updated to: ${updated.status}`,
        });
        setActiveStep(getStepNumberFromStatus(updated.status));
      } else {
        toast.error("Error updating status", {
          description: "Received an invalid response from the server.",
        });
      }
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", {
        description: error.message || "An unexpected error occurred.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["job-applications"]);
    },
  });

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  useEffect(() => {
    setActiveStep(getStepNumberFromStatus(status));
  }, [status]);

  const handleStatusChange = (newStatus) => {
    if (newStatus !== status) {
      changeCandidateStatus({ applicationId, newStatus });
    }
  };

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      const nextStatus = steps[activeStep].title;
      changeCandidateStatus({ applicationId, newStatus: nextStatus });
    } else {
      toast.warning("Reached the end!", {
        description: `Candidate is already at ${status}`,
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-3xl font-grotesk">
            Candidate Details
          </SheetTitle>
          <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Application Status</SelectLabel>
                {steps.map((step) => (
                  <SelectItem key={step.number} value={step.title}>
                    {step.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </SheetHeader>
        {isLoading ? (
          <div>
            <div className="space-y-6 bg-black my-6">
              <Loader />
            </div>
          </div>
        ) : (
          <div className="space-y-6 my-6">
            {/* Info */}
            <Card className="bg-muted font-grotesk rounded-xl">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={data?.user?.profilePic} alt="" />
                    <AvatarFallback>
                      {data?.user?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center p-2 leading-none font-grotesk">
                    <p className="font-bold text-2xl">{data?.user?.fullName}</p>
                    <p className="font-semibold text-lg text-gray-500/50">
                      {data?.user?.designation}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardFooter>
                <div className="min-w-full space-y-2 text-md leading-tight font-medium">
                  <div className="flex flex-row items-center ">
                    <div className="p-2 bg-gray-500/20 rounded-full mr-3">
                      <Mail size={25} className="fill-black stroke-white/80" />
                    </div>
                    <div className="">
                      <div className="text-gray-500 font-semibold">Email:</div>
                      <div>
                        {data?.user?.contactEmail || "amitparmar901@gmail.com"}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center ">
                    <div className="p-2 bg-gray-500/20 rounded-full mr-3">
                      <Phone size={25} className="fill-black stroke-white/80" />
                    </div>
                    <div className="">
                      <div className="text-gray-500 font-semibold">Phone:</div>
                      <div>{data?.user?.contact || "91038 23987"}</div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
            {/* Status */}
            <Card className="bg-muted font-grotesk rounded-xl">
              <CardHeader className="text-xl font-semibold">
                Application Details
              </CardHeader>
              <div>
                <div className="p-6 rounded-lg max-w-md">
                  <div className="capitalize mb-6">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-start h-16">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.number < activeStep ||
                              (step.number === 4 && activeStep === 4)
                                ? "bg-green-500"
                                : step.number === activeStep
                                ? "bg-yellow-500"
                                : "bg-gray-700"
                            }`}
                          >
                            {step.number < activeStep ||
                            (step.number === 4 && activeStep === 4) ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : step.number === activeStep ? (
                              isPending ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                              ) : (
                                <Clock className="w-5 h-5 text-white" />
                              )
                            ) : (
                              <span className="text-white">{step.number}</span>
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-700 mt-1"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-primary font-medium">
                            {step.title}
                          </h3>

                          {step.number === activeStep && (
                            <span
                              className={`inline-block bg-green-600 text-sm px-2 font-medium rounded-full mt-1 text-background`}
                            >
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleNextStep}
                    size="lg"
                    disabled={activeStep === steps.length}
                    className="w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:bg-blue-600 group text-lg font-semibold py-2 px-4 rounded items-center"
                  >
                    <span>
                      {activeStep === steps.length
                        ? "Application Complete"
                        : "Move to Next Step"}
                    </span>
                    <span className="group-hover:translate-x-5 transition-all group-hover:text-black items-center">
                      <ArrowRight />
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

CandidateStatus.propTypes = {
  status: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  candidateId: PropTypes.string.isRequired,
  applicationId: PropTypes.string.isRequired,
};

export default CandidateStatus;
