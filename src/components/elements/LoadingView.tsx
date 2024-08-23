import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingView() {
  return (
    <div className="flex-1 w-full min-h-screen text-primary flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
    </div>
  );
}

export default LoadingView;
