"use client";

import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { RenderEmptyState } from "./render-state";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";

interface UploadFileI {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isError: boolean;
  isDeleting: boolean;
  objectUrl?: string;
  fileType: "image" | "vidio";
}

const Uploader = () => {
  const [fileState, setFileState] = useState<UploadFileI>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isError: false,
    isDeleting: false,
    fileType: "image",
  });

  const uploadFile = (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }));

    try {
    } catch {}
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const id = uuidV4();

      setFileState({
        id,
        file,
        uploading: false,
        objectUrl: URL.createObjectURL(file),
        progress: 0,
        isError: false,
        isDeleting: false,
        fileType: "image",
      });
    }
  }, []);

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    const fileTooLarge = fileRejection.find(
      (rejection) => rejection.errors[0].code === "file-too-large"
    );
    if (fileTooLarge) {
      toast.error("File is larger than 5mb");
    }

    const tooManyFile = fileRejection.find(
      (rejection) => rejection.errors[0].code === "too-many-files"
    );
    if (tooManyFile) {
      toast.error("Too many fle, max upload file is 1");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // size 5mb
    accept: { "image/*": [] },
    maxFiles: 1,
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      className={cn(
        "h-[200px] border-dashed border-2 transition-colors",
        isDragActive
          ? "border-primary border border-solid"
          : "hover:border-primary"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex justify-center items-center h-full">
        <RenderEmptyState isDragActive={isDragActive} />
      </div>
    </Card>
  );
};

export default Uploader;
