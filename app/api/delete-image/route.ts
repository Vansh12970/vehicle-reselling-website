import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary from server env (must NOT be NEXT_PUBLIC_ for secret)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const public_id = body?.public_id;

    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    // cloudinary returns { result: "ok" } or { result: "not found" }
    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Cloudinary deletion unexpected result:", result);
      return NextResponse.json({ error: "Cloudinary deletion failed", detail: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("Error in /api/delete-image:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
