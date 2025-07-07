"use server";

import { notFound } from "next/navigation";
import { prisma } from "../prisma";
import { requiredAdmin } from "./required-admin";

export const adminCourses = async () => {
  await requiredAdmin();

  return prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
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

export const adminSingularCourse = async (dataId: string) => {
  const session = await requiredAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: dataId,
      userId: session.user.id,
    },
    select: {
      description: true,
      duration: true,
      catagory: true,
      fileKey: true,
      level: true,
      id: true,
      price: true,
      slug: true,
      smallDescription: true,
      status: true,
      title: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export type adminSingularCourseType = Awaited<
  ReturnType<typeof adminSingularCourse>
>;
