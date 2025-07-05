"use client";

import { useTheme } from "next-themes";
import { Button } from "./button";
import { IconBrightnessHalf, IconMoonStars } from "@tabler/icons-react";
import { NavbarButton } from "./resizable-navbar";
import { useEffect, useState } from "react";

const ButtonTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(!mounted);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="secondary"
        className="rounded-xl"
        size={"icon"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <IconBrightnessHalf className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <IconMoonStars className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ButtonTheme;
