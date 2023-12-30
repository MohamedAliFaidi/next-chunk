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
    const searchParams = req.nextUrl.searchParams;
    console.log(searchParams);
    const id = searchParams.get("id");
    console.log(id);
    const formData = await req.formData();
    if (typeof formData.get("image") === "object") {
      const file = formData.get("image");
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "avatars" }, function (error, result) {
            if (error) {
              console.log(error);
              reject(error);
              return;
            }
            resolve(result);

            User.findByIdAndUpdate(id, {
              avatar: { url: result.secure_url, public_id: result.public_id },
            }).catch((err) => {
                return NextResponse.json(
                  { message: "Error", err },
                  {
                    status: 500,
                  }
                );
              });
          })
          .end(buffer);
      });
    }
    const user = await User.findByIdAndUpdate(id, {
      name: formData.get("name"),
      email: formData.get("email"),
    });
    const validated = await User.findById(id);
    console.log('validated  ',validated)

    return NextResponse.json(
      { message: "succeed", validated },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Error", err },
      {
        status: 500,
      }
    );
  }
}
