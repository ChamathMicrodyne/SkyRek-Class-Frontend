import React from "react";

function LoadingAnimation() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60px] h-[60px] border-[5px] border-gray-200 border-t-blue-400 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingAnimation;
