import { buttonVariants } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="m-4">
      <div className="flex justify-end items-center w-full">
        <Link
          href={"/admin/courses/create-courses"}
          className={buttonVariants()}
        >
          <IconPlus /> Create Courses
        </Link>
      </div>
    </div>
  );
};

export default CoursesPage;
