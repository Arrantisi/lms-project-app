import NavbarHome from "@/components/home/navbar";
import { authClient } from "@/lib/auth-client";
import React, { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const { data: session } = await authClient.getSession();

  return <NavbarHome>{children}</NavbarHome>;
};

export default HomeLayout;
