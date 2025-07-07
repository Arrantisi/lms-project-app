import { buttonVariants } from "@/components/ui/button";
import { IconArrowLeft, IconHeadset } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const ContactSupportPage = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center h-screen flex flex-col justify-center items-center space-y-4 p-4">
      <IconHeadset /> <span>Contact Page</span>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        <IconArrowLeft className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default ContactSupportPage;
