"use server";

import { prisma } from "../prisma";
import { requiredAdmin } from "./required-admin";

export const adminCourses = async () => {
  await requiredAdmin();

  return prisma.course.findMany({
    select: {
      id: true,
      title: true,
      duration: true,
      fileKey: true,
      smallDescription: true,
      status: true,
      level: true,
      price: true,
      catagory: true,
    },
  });
};

export type AdminCoursesType = Awaited<ReturnType<typeof adminCourses>>[0];
