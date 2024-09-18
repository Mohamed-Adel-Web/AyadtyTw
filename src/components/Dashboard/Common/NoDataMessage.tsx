import React from "react";
import { AlertCircle } from "lucide-react";

interface NoDataMessageProps {
  message: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => (
  <div className="col-span-12 flex justify-center">
    <AlertCircle className="w-8 h-8 text-red-500" />
    <p className="text-lg text-gray-500 ml-2">{message}</p>
  </div>
);

export default NoDataMessage;
