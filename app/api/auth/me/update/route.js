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
  const updated = {
    name: formData.get("name"),
    email: formData.get("email"),
  };
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
          updated.avatar = {
            url: result.secure_url,
            public_id: result.public_id,
          };
          console.log(result, "updated");
        })
        .end(buffer);
    });
  }

  const user = await User.findOneAndUpdate(
    {
      email: formData.get("email"),
    },
    updated
  );

  return NextResponse.json(
    { message: "succeed", user },

    {
      status: 200,
    }
  );
}
