"use server";
import cloudinary from"cloudinary"

import "../helper/cloudinary"
const v6 = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



export const uploadAvatar = async (formData) => {
  const file = formData.get("image");
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await new Promise((resolve,reject)=>{

      v6.uploader.upload_stream({},function(error,result){
        if(error) {
            reject(error)
            return
        }
        console.log(result)
resolve(result)
      }).end(buffer)

  })
};
