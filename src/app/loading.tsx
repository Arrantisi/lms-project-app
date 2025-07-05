import { Ripple } from "@/components/magicui/ripple";
import React from "react";

const Loading = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <p className="z-10 whitespace-pre-wrap text-center text-4xl font-medium tracking-tighter text-white">
        Loading
      </p>
      <Ripple />
    </div>
  );
};

export default Loading;
