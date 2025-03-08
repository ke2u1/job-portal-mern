import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CardSkeleton = ({ className }) => {
  return (
    <Skeleton
      className={cn(
        "p-2 border-l-8 border max-h-[360px] hover:border hover:border-r-8 hover:shadow-xl rounded-3xl w-[90%] sm:w-64 md:w-72 lg:w-80 min-h-[350px] bg-muted",
        className
      )}
    >
      <Skeleton className="bg-gray-300 border h-4/5 min-h-[80%] max-h-[80%] rounded-2xl w-full" />
      <Skeleton className="" />
    </Skeleton>
  );
};

export default CardSkeleton;
