import React from "react";

const LoadingCom = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingCom;