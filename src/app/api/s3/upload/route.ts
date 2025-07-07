import { env } from "@/lib/env";
import { uploadFileSchema } from "@/schemas";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3-client";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requiredAdmin } from "@/lib/data/required-admin";

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

export async function POST(request: Request) {
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

    const validate = uploadFileSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 500 }
      );
    }

    const { contentType, fileName, size } = validate.data;

    const uniqueKey = `${uuidV4()}-${fileName}`;
    console.log(uniqueKey);

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(s3, command, {
      expiresIn: 3600, // URL expired in 1 hour
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
