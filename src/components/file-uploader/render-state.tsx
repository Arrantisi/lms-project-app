import {
  IconCloudUpload,
  IconCloudX,
  IconLoader2,
  IconX,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <IconCloudUpload className="size-12" />
      <span className="text-muted-foreground text-sm">
        {isDragActive ? "Drag here" : "Drag and drop your image here"}
      </span>
      <Button type="button" size={"sm"}>
        Uploud Here
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <IconCloudX className="size-12 text-destructive" />
      <p className="text-sm">The File is not allowed</p>
      <Button type="button" size={"sm"}>
        Try To Upload Again
      </Button>
    </div>
  );
};

export const RenderUpdloadedFile = ({
  objectUrl,
  isDeleting,
  handleRemoveFile,
}: {
  objectUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) => {
  return (
    <div>
      <Image
        src={objectUrl}
        fill
        alt="file uploded"
        className="object-contain"
      />
      <Button
        type="button"
        variant={"destructive"}
        size={"icon"}
        onClick={handleRemoveFile}
        disabled={isDeleting}
        className={cn("absolute top-4 right-4")}
      >
        {isDeleting ? (
          <IconLoader2 className="size-4 animate-spin" />
        ) : (
          <IconX className="size-4" />
        )}
      </Button>
    </div>
  );
};

export const RenderProgresState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="flex items-center flex-col space-y-2">
      <p className="font-bold text-5xl">{progress}%</p>
      <p className="max-w-sm truncate text-sm text-muted-foreground">
        {file.name}
      </p>
    </div>
  );
};
