import { NextResponse } from "next/server";
import User from "../../../../../helper/user.model";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req, res) {
  const formData = await req.formData();
  const file = formData.get("image");
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          console.log(error);
          reject(error);
          return;
        }
        resolve(result);
        console.log(result);
      })
      .end(buffer);
  });

  return NextResponse.json(
    { message: "succeed", data: buffer },
    {
      status: 200,
    }
  );
}
