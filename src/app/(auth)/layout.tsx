import ButtonBack from "@/components/ui/button-back";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <ButtonBack />
      {children}
    </div>
  );
};

export default AuthLayout;
