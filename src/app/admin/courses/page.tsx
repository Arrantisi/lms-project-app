import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { adminCourses } from "@/lib/data/data-courses-admin";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import CardCoursesComponent from "./_component/card-courses";

const CoursesPage = async () => {
  const data = await adminCourses();

  return (
    <div className="m-4">
      <div className="flex justify-between items-center w-full">
        <div>
          <CardTitle className="text-2xl">Your Courses</CardTitle>
        </div>
        <Link
          href={"/admin/courses/create-courses"}
          className={buttonVariants()}
        >
          <IconPlus /> Create Courses
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-12 gap-2">
        {data.map((item) => (
          <CardCoursesComponent key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
