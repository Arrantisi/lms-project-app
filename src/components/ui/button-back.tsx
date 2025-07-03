"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <Button
      className="absolute top-4 left-4"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft />
      Back
    </Button>
  );
};

export default ButtonBack;
