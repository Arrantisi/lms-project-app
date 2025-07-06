import { Marquee } from "@/components/magicui/marquee";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Icon,
  IconBooks,
  IconChartBar,
  IconDeviceGamepad2,
  IconSend,
  IconUsersGroup,
} from "@tabler/icons-react";

interface featuresProps {
  title: string;
  description: string;
  icon: Icon;
}

const features: featuresProps[] = [
  {
    title: "Comprenensive Courses",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: IconBooks,
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: IconDeviceGamepad2,
  },
  {
    title: "Progress 1rackang",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: IconChartBar,
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: IconUsersGroup,
  },
];

export default function Home() {
  return (
    <>
      <section className="py-20 px-4 ">
        <div className="flex flex-col justify-center items-center">
          <Badge variant={"outline"}>🎉 The Future of Online Education</Badge>
          <h1 className="font-bold text-7xl text-primary/100 py-8">
            Elevate your Learning Experience
          </h1>
          <span className="text-muted-foreground max-w-xl text-center ">
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </span>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-12">
          <Button>
            <IconSend /> Get Started
          </Button>
          <Button variant={"secondary"}>Sigin courses</Button>
        </div>
      </section>
      <section className="overflow-hidden relative w-full">
        <div className="absolute bg-gradient-to-r from-background via-transparent to-background z-50 h-[500px] w-full" />
        <Marquee pauseOnHover className=" [--duration:20s]">
          {features.map((item) => (
            <figure
              key={item.title}
              className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <item.icon />
                <div className="flex flex-col">
                  <p className="text-xs font-medium dark:text-white/40">
                    {item.title}
                  </p>
                </div>
              </div>
              <blockquote className="mt-2 text-sm">
                {item.description}
              </blockquote>
            </figure>
          ))}
        </Marquee>
      </section>
    </>
  );
}
