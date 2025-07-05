import NavbarHome from "@/components/home/navbar";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <NavbarHome />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default HomeLayout;
