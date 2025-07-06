import { buttonVariants } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import FormCourses from "../_component/form-courses";

const CreateCoursesPage = () => {
  return (
    <div className="m-4 space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({
            variant: "secondary",
            size: "icon",
          })}
        >
          <IconArrowLeft />
        </Link>
        <span className="font-semibold ml-6">Create your Courses here</span>
      </div>

      <div>
        <FormCourses />
      </div>
    </div>
  );
};

export default CreateCoursesPage;
