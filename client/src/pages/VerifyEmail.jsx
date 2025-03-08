import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { verifyEmail } from "@/services/authServices";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, MailOpen } from "lucide-react";

const VerifyEmail = () => {
  const { token } = useParams();

  const { data, mutate, status, error } = useMutation({
    mutationFn: () => verifyEmail(token),
    onSuccess: () => {
      toast.success("Email verified successfully!", {
        icon: <CheckCircle className="w-4 h-4" />,
      });
    },
    onError: (error) => {
      toast.error("Error verifying email!", {
        description: error?.response?.data?.message,
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8vh)] w-screen bg-cyan-200/20">
      {status === "pending" ? (
        <p>Verifying email...</p>
      ) : status === "success" ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <p className="text-lg font-medium">{data.message}</p>
        </div>
      ) : (
        <Button className="" onClick={() => mutate()} disabled={error}>
          <MailOpen className="w-4 h-4 mr-2" />
          {error
            ? `${error?.response?.data?.message}, Please try login`
            : "Verify Email"}
        </Button>
      )}
    </div>
  );
};

export default VerifyEmail;
