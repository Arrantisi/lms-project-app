"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const [isPendingGithub, startTransitionGithub] = useTransition();
  const [isPendingEmail, startTransitionEmail] = useTransition();

  const signInWithGithub = async () => {
    startTransitionGithub(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("signed in with github account");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  const handleSiginEmail = () => {
    startTransitionEmail(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("email otp has sanding to your email!");
            router.push(`/verify-code-otp?email=${email}`);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="button"
                className="w-full"
                onClick={handleSiginEmail}
                disabled={isPendingEmail}
              >
                {isPendingEmail ? (
                  <Loader className="animate-spin" />
                ) : (
                  <IconBrandGoogleFilled />
                )}{" "}
                Continue With Gmail
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="w-full"
                  variant={"outline"}
                  onClick={signInWithGithub}
                  disabled={isPendingGithub}
                >
                  {isPendingGithub ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <IconBrandGithub />
                  )}{" "}
                  Sign In with GitHub
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/profile-9.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
