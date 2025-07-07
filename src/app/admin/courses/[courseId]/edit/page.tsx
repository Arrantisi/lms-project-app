import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminSingularCourse } from "@/lib/data/data-courses-admin";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import FormCoursesEdit from "./_component/edit-course-form";

type Params = Promise<{ courseId: string }>;

const CouerseEdit = async ({ params }: { params: Params }) => {
  const { courseId } = await params;

  const data = await adminSingularCourse(courseId);

  return (
    <div className="m-4">
      <div className="flex items-center gap-2 mb-4">
        <Link
          href={"/admin/courses"}
          className={buttonVariants({ variant: "secondary" })}
        >
          <IconArrowLeft className="size-4" />
        </Link>
        <CardTitle className="text-2xl">
          <span>{data?.title}</span>
        </CardTitle>
      </div>
      <Tabs defaultValue="tab-1" className="mt-12">
        <TabsList>
          <TabsTrigger value="tab-1">Edit Course</TabsTrigger>
          <TabsTrigger value="tab-2">asdw Course</TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <FormCoursesEdit data={data} />
        </TabsContent>
        <TabsContent value="tab-2">
          <div className="bg-blue-500">tab2</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CouerseEdit;
