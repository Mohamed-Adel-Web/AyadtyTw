import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner: React.FC = () => (
  <div className="col-span-12 flex justify-center min-vh-100 align-items-center">
    <Loader className="animate-spin w-8 h-8 text-gray-500" />
  </div>
);

export default LoadingSpinner;
