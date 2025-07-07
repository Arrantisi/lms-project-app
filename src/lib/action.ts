"use server";

import { courseSchema, courseType } from "@/schemas";
import { courseCreateType } from "@/types";
import { prisma } from "./prisma";
import { requiredAdmin } from "./data/required-admin";
import arcjet, { detectBot, fixedWindow } from "./arcjet";
import { request } from "@arcjet/next";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      max: 5,
      window: "1m",
    })
  );

export const createCourse = async (
  formData: courseType
): Promise<courseCreateType> => {
  const validation = courseSchema.safeParse(formData);

  const session = await requiredAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      figenrprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message:
            "You have exceeded the rate limit of 5 requests per minute. Please wait and try again shortly.",
        };
      } else {
        return {
          status: "error",
          message: "Our system flagged this as potential bot traffic.",
        };
      }
    }

    if (!validation.success) {
      return { status: "error", message: "Form Data was invalid" };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session.user.id,
      },
    });

    return {
      status: "success",
      message: "course was successfully created",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Unexpected server error. Please try again later.",
    };
  }
};

export const editCourse = async (
  formData: courseType,
  courseId: string
): Promise<courseCreateType> => {
  const session = await requiredAdmin();

  try {
    const validation = courseSchema.safeParse(formData);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        ...validation.data,
      },
    });

    return {
      status: "success",
      message: "Edit course was successfully",
    };
  } catch {
    return {
      status: "error",
      message: "there unexpected error at server",
    };
  }
};
