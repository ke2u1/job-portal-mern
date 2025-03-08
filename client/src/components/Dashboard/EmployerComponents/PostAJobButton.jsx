import JobForm from "./JobForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/services/JobServices";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const jobSchema = z.object({
  company: z
    .string()
    .min(1, "Company field is required")
    .transform((val) => val.trim()),
  title: z
    .string()
    .min(1, "Title field is required")
    .transform((val) => val.trim()),
  description: z
    .string()
    .min(1, "Description field is required")
    .transform((val) => val.trim()),
  location: z.object({
    city: z
      .string()
      .min(1, "City field is required")
      .transform((val) => val.trim()),
    state: z
      .string()
      .optional()
      .transform((val) => val.trim()),
    country: z
      .string()
      .min(1, "Country field is required")
      .transform((val) => val.trim()),
  }),
  salaryRange: z.object({
    min: z
      .string()
      .optional()
      .transform((val) => val.trim()),
    max: z
      .string()
      .optional()
      .transform((val) => val.trim()),
  }),
  status: z.enum(["open", "closed"]).default("open"),
  frequency: z.enum(["hourly", "monthly", "yearly"]),
  skillsRequired: z
    .string()
    .transform((val) => val.trim().replace(/,\s+/g, ",").replace(/\s+,/g, ",")),
  jobType: z.enum(["full time", "part time", "internship"]),
  workFrom: z.enum(["remote", "on-site", "hybrid"]),
  experience: z.enum(["entry-level", "mid-level", "senior-level"]),
});

const PostAJobButton = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(jobSchema),
  });

  // mutation initialization
  const mutation = useMutation({
    mutationFn: createJob, // Specify mutation function
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["recruiter-jobs"]);
      form.reset(); // Reset the form fields
    },
  });

  // Submit job @{params} jobData
  const handleJobSubmit = (jobData) => {
    // check erros
    const { errors } = form.formState;

    // Log validation errors if they exist
    if (Object.keys(errors).length > 0) {
      toast.error(errors);
      console.log("Validation errors:", errors);
      return;
    }

    mutation.mutate(jobData, {
      onSuccess: (data) => {
        toast.success("Successfully posted!", {
          description: data?.message,
        });
      },
      onError: (error) =>
        toast.error("Failed posting!", {
          description: error.message,
        }),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Post a job"
          className="border w-fit lg:w-fit text-center lg:mx-auto rounded-full px-1.5 lg:px-4 font-bold lg:gap-2 font-grotesk lg:scale-110 border-black transition-all lg:border-b py-2 lg:whitespace-nowrap"
          onClick={() => setOpen(true)} // Open dialog on button click
        >
          <Plus />
          <span className="hidden lg:block">Post a Job</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-screen-xl max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to post a new job listing.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <JobForm
            companies={user?.companies}
            form={form}
            onSubmit={handleJobSubmit} // pass the function to receive in data
            onCancel={() => setOpen(false)} // close the dialog onCancel
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAJobButton;
