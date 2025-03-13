import React from "react";

const PageLoader = () => {
  return (
    <div className="flex gap-2 items-center justify-center  min-h-[500px] ">
      <div className="relative">
        <div className="h-10 w-10 bg-[#9aaea1] rounded-full animate-ping absolute top-1/2 left-1/2 -translate-1/2 "></div>
        {/* <div className="text-xl font-semibold">Loading ...</div> */}
        <div className="animate-spin w-7 h-7 border-[3px] border-t-transparent border-[#00A63E] rounded-full flex items-center justify-center">
          <div className="animate-spin inline-block w-5 h-5 border-[3px] border-t-transparent border-[#00A63E] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
