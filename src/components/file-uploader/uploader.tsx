"use client";

import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderProgresState,
  RenderUpdloadedFile,
} from "./render-state";
import { v4 as uuidV4 } from "uuid";
import { toast } from "sonner";
import { useConstruct } from "@/hooks/use-construct-url";

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

interface IAppUploader {
  value?: string;
  onChange?: (value: string) => void;
}

const Uploader = ({ value, onChange }: IAppUploader) => {
  const Thumbnail = useConstruct(value || "");

  const [fileState, setFileState] = useState<UploadFileI>({
    id: null,
    file: null,
    uploading: false,
    progress: 0,
    isError: false,
    isDeleting: false,
    fileType: "image",
    key: value,
    objectUrl: value ? Thumbnail : "",
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
      }));

      try {
        // 1. get presigned URL

        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: true,
          }),
        });

        if (!presignedResponse.ok) {
          toast.error("Failed to get presigned URL");
          setFileState((prev) => ({
            ...prev,
            uploading: false,
            progress: 0,
            isError: true,
          }));
          return;
        }

        const { presignedUrl, key } = await presignedResponse.json();

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const precentageComplited = (event.loaded / event.total) * 100;
              setFileState((prev) => ({
                ...prev,
                progress: Math.round(precentageComplited),
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFileState((prev) => ({
                ...prev,
                progress: 100,
                uploading: false,
                key: key,
              }));
              onChange?.(key);

              toast.success("Upload file was succesfully");

              resolve();
            } else {
              reject(new Error("Upload failed"));
            }
          };
          xhr.onerror = () => {
            reject(new Error("Upload failed"));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch {
        toast.error("Something went Error");

        setFileState((prev) => ({
          ...prev,
          progress: 0,
          isError: true,
          uploading: false,
        }));
      }
    },
    [onChange]
  );

  const handleDeleteFile = async () => {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });
      console.log(response);

      if (!response.ok) {
        toast.error("Failde to remove from storage");

        setFileState((prev) => ({
          ...prev,
          isError: true,
          isDeleting: true,
        }));

        return;
      }

      if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      setFileState(() => ({
        file: null,
        fileType: "image",
        id: null,
        isDeleting: false,
        objectUrl: undefined,
        isError: false,
        progress: 0,
        uploading: false,
      }));

      onChange?.("");

      toast.success("File remove succesfully");
    } catch {
      toast.error("Error removing file, please try again");

      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        isError: true,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const id = uuidV4();

        if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
        setFileState({
          id,
          file,
          uploading: true,
          objectUrl: URL.createObjectURL(file),
          progress: 0,
          isError: false,
          isDeleting: false,
          fileType: "image",
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile]
  );

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

  const renderContent = () => {
    if (fileState.uploading) {
      return (
        <RenderProgresState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      );
    }

    if (fileState.isError) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUpdloadedFile
          objectUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleDeleteFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // size 5mb
    accept: { "image/*": [] },
    maxFiles: 1,
    onDropRejected: rejectedFiles,
    disabled: fileState.isDeleting || !!fileState.objectUrl,
  });

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  return (
    <Card
      className={cn(
        "h-[300px] border-dashed border-2 transition-colors",
        isDragActive
          ? "border-primary border border-solid"
          : "hover:border-primary"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="flex justify-center items-center h-full relative">
        {renderContent()}
      </div>
    </Card>
  );
};

export default Uploader;
