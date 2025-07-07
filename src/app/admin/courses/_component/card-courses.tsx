import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConstruct } from "@/hooks/use-construct-url";
import { AdminCoursesType } from "@/lib/data/data-courses-admin";
import {
  IconArrowLeft,
  IconChartBar,
  IconDots,
  IconEdit,
  IconEye,
  IconStopwatch,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const CardCoursesComponent = ({ data }: { data: AdminCoursesType }) => {
  const thumbnailUrl = useConstruct(data.fileKey);

  return (
    <Card className="w-full p-0">
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"xs"}
              variant={"secondary"}
              className="absolute top-0.5 right-0.5"
            >
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <IconEye className="size-4" /> Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconEdit className="size-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconTrash className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Image
          src={thumbnailUrl}
          alt="courses-image"
          width={400}
          height={400}
          className="w-full rounded-t-lg aspect-video object-cover h-[200px]"
        />
      </div>
      <div className="mx-3 flex flex-col justify-between h-full ">
        <CardTitle className="text-primary mb-2">{data.title}</CardTitle>
        <CardDescription className="text-muted-foreground h-full truncate max-w-[sm]">
          {data.smallDescription}
        </CardDescription>
        <div className="flex items-center justify-start gap-4 text-sm mt-4 ">
          <div className="flex items-center gap-1">
            <IconStopwatch className="size-4" />
            <span className="text-sm">{data.duration} menit</span>
          </div>
          <div className="flex items-center gap-1">
            <IconChartBar className="size-4" />
            <span className="text-sm">{data.level}</span>
          </div>
        </div>
      </div>

      <Link
        href={`/admin/courses/${data.id}/edit`}
        className={buttonVariants({ className: "m-3" })}
      >
        <IconArrowLeft className="size-4" /> Edit Couses
      </Link>
    </Card>
  );
};

export default CardCoursesComponent;
