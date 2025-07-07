import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requiredAdmin } from "@/lib/data/required-admin";
import { env } from "@/lib/env";
import { s3 } from "@/lib/s3-client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

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
      window: "1m",
      max: 5,
    })
  );

export const DELETE = async (request: Request) => {
  const session = await requiredAdmin();

  try {
    const body = await request.json();

    const decision = await aj.protect(request, {
      figenrprint: session.user.id,
    });

    if (decision.isDenied())
      return NextResponse.json(
        {
          error: "was problem",
        },
        { status: 429 }
      );

    const key = body.key;

    if (!key) {
      return {
        error: "Invalid Request Body",
        status: 404,
      };
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await s3.send(command);

    return NextResponse.json(
      { message: "File deleting succesfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Missing of invalid object key" },
      { status: 400 }
    );
  }
};
