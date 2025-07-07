import { buttonVariants } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { IconArrowLeft, IconShieldX, IconHeadset } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NotAdminPage = () => {
  return (
    <div className="w-full max-w-md mx-auto text-center h-screen flex flex-col justify-center items-center space-y-4 p-4">
      <div className="bg-destructive/10 p-4 rounded-full">
        <IconShieldX className="text-destructive size-12" />
      </div>

      <CardTitle className="text-2xl font-bold">Access Restricted</CardTitle>

      <CardDescription className="text-muted-foreground mb-6">
        This page requires administrator privileges. Please verify your account
        permissions or contact your organization&apos;s admin team.
      </CardDescription>

      <CardContent className="flex flex-col gap-4 w-full">
        <div className="flex gap-3 w-full justify-center">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            <IconArrowLeft className="mr-2" />
            Back to Home
          </Link>

          <Link
            href="/contact-support"
            className={buttonVariants({ variant: "default" })}
          >
            <IconHeadset className="mr-2" />
            Contact Support
          </Link>
        </div>

        <CardDescription className="text-xs text-center text-muted-foreground">
          Having trouble? Email us at{" "}
          <a
            href="mailto:support@yourcompany.com"
            className="underline text-primary"
          >
            support@yourcompany.com
          </a>
        </CardDescription>
      </CardContent>
    </div>
  );
};

export default NotAdminPage;
