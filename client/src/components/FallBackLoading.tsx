import { Loader } from "lucide-react";
const FallBackLoading = () => {
  return (
    <div className="h-screen bg-slate-300 w-full flex items-center justify-center">
      <Loader className="animate-spin size-10 sm:size-20" />
    </div>
  );
};

export default FallBackLoading;
