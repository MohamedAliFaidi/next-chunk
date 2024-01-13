import { NextResponse } from "next/server";
import User from "../../../../../helper/user.model";
import { v2 as cloudinary } from "cloudinary";
import dbConnet from "../../../../../helper/db";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});



export async function POST(req) {
  try {
    await dbConnet();

    const formData = await req.formData();
    const file = await formData.get("image");

    if (file) {
      await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file,
          { folder: "avatars", resource_type: "auto" },
          async function (error, result) {
            if (error) {
              console.error("Upload error:", error);
              reject(error);
              return;
            }
            resolve(result);
              await User.findByIdAndUpdate(formData.get("id"), {
              avatar: { url: result.secure_url, public_id: result.public_id },
            });
          }
        );
      });
    }
    await User.findByIdAndUpdate(formData.get("id"), {
      name: formData.get("name"),
      email: formData.get("email"),
    });
    const validated = await User.findById(formData.get("id"));
    return NextResponse.json(
      { message: "succeed", validated },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
