import { NextResponse } from "next/server";
import { revalidatePRoducts } from "../../../../helper/revalidate";
import { v2 as cloudinary } from "cloudinary";
import Product from "../../../../helper/product.model";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const product = await JSON.parse(formData.get("product"));
    const newProduct = await Product.create(product);

    let images = [];
    for (let pair of formData.entries()) {
      if (pair.includes("image")) {
        images.push(pair[1]);
      }
    }
    if (images.length > 0) {
      images.forEach(async (image) => {
        await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(
            image,
            { folder: `products/${newProduct._id}`, resource_type: "auto" },
            async function (error, result) {
              if (error) {
                console.error("Upload error:", error);
                const del = await Product.findByIdAndDelete(newProduct._id)
                reject(error);
                return;
              }
              resolve(result);
              const data = await Product.findByIdAndUpdate(newProduct._id, {
                $push: {
                  images: {
                    url: result.secure_url,
                    public_id: result.public_id,
                  },
                },
              });
            }
          );
        });
      });
    }

    const myProduct = await Product.findById(newProduct._id)
    await revalidatePRoducts()
    const response = NextResponse.json({ status: 201,data : myProduct });
    return response;
  } catch (error) {
    console.log(error.message);
    const response = NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
    return response;
  }
}
