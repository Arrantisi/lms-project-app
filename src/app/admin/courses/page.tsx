import { buttonVariants } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import FormCourses from "./_component/form-courses";

const CoursesPage = () => {
  return (
    <div className="m-4 space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href={"/admin"}
          className={buttonVariants({
            variant: "secondary",
            size: "icon",
          })}
        >
          <IconArrowLeft />
        </Link>
        <span>Back to admin dashboard</span>
      </div>

      <div>
        <FormCourses />
      </div>
    </div>
  );
};

export default CoursesPage;
