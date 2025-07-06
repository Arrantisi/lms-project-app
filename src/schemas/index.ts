import { z } from "zod";

export const levelCouerses = ["Beginner", "Intermedia", "Advanced"] as const;

export const statusCourses = ["Draft", "Published", "Archived"] as const;

export const catagorysCourses = [
  "Development",
  "Busincess",
  "Finance",
  "It & Software",
  "Office production",
  "personal Development",
  "Design",
  "Marketing",
  "health & Fitness",
  "Music",
  "teaching & Academyc",
] as const;

export const courseSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3),
  fileKey: z.string().min(3, { message: "file is required" }),

  price: z.coerce
    .number()
    .min(1, { message: "price must be a positive number" }),
  duration: z.coerce.number().min(1).max(500),

  level: z.enum(levelCouerses),

  catagory: z.enum(catagorysCourses),
  smallDescription: z.string().min(3).max(200),
  slug: z.string().min(3),

  status: z.enum(statusCourses),
});

export type courseType = z.infer<typeof courseSchema>;

export const uploadFileSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().min(1),
  isImage: z.boolean(),
});
