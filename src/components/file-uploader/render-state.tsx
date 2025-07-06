import { IconCloudUpload, IconCloudX } from "@tabler/icons-react";
import { Button } from "../ui/button";

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
