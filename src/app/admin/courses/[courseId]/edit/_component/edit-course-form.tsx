"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  catagorysCourses,
  courseSchema,
  courseType,
  levelCouerses,
  statusCourses,
} from "@/schemas";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconEdit, IconLoader2, IconSparkles } from "@tabler/icons-react";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichCodeEditor from "@/components/rich-code-editor/editor";
import Uploader from "@/components/file-uploader/uploader";
import { tryCatch } from "@/hooks/try-catch";
import { editCourse } from "@/lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { adminSingularCourseType } from "@/lib/data/data-courses-admin";

interface iAppProps {
  data: adminSingularCourseType;
}

const FormCoursesEdit = ({ data }: iAppProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<courseType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      catagory: data.catagory as courseType["catagory"],
      description: data.description,
      duration: data.duration,
      fileKey: data.fileKey,
      level: data.level,
      price: data.price,
      slug: data.slug,
      smallDescription: data?.smallDescription,
      status: data?.status,
    },
  });

  const handleSubmit = (values: courseType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id)
      );

      if (error) {
        console.log(error);
        toast.error("was unexpected error");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/courses");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };

  const handleSlug = () => {
    const titleValue = form.getValues("title");

    const slug = slugify(titleValue);

    form.setValue("slug", slug, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Provide basic information about the courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-end">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" onClick={handleSlug}>
                Generate Slug <IconSparkles />
              </Button>
            </div>
            <FormField
              control={form.control}
              name="smallDescription"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Small descrption</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Small description"
                      className="min-h-[60px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrption</FormLabel>
                  <FormControl>
                    <RichCodeEditor field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileKey"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Thumbnail image</FormLabel>
                  <FormControl>
                    <Uploader onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="catagory"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Catagory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select catagory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {catagorysCourses.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select Catagory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="select Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levelCouerses.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Duration" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusCourses.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-40" disabled={isPending}>
              {isPending ? (
                <IconLoader2 className="animate-spin" />
              ) : (
                <IconEdit />
              )}{" "}
              Edit Courses
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormCoursesEdit;
