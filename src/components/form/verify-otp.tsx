"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isVerifyCode, startingVerifyCode] = useTransition();
  const [isResendCode, startingResendCode] = useTransition();

  const query = useSearchParams();
  const email = query.get("email") as string;

  const router = useRouter();

  const handleVerifyCode = () => {
    startingVerifyCode(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Code otp accepted");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  const isOtpEmpty = otp.length <= 5;

  const hendleResendCode = () => {
    startingResendCode(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verify code reseded");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify Your OTP Code</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            -
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="w-full"
            onClick={handleVerifyCode}
            disabled={isVerifyCode || isOtpEmpty}
          >
            {isVerifyCode && <Loader className="animate-spin" />} Verify code
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={"link"}
          className="text-muted-foreground w-full text-center"
          onClick={hendleResendCode}
          disabled={isResendCode}
        >
          resend verify code?
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtp;
