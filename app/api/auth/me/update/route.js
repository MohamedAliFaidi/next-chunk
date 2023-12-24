import { NextResponse } from "next/server";
import User from "../../../../../helper/user.model"
import fs from "fs";
import { NextRequest } from "next/server";
import {uploads} from "../../../../../helper/cloudinary"


export async function POST (req) {
  try {
    const formData = await req.formData();
    console.log(formData)

 


//     const reader = req.body.getReader();
// let result = '';

// reader.read().then(function processText({ done, value }) {
//   if (done) {
//     console.log( result);
//     return;
//   }

//   result += value;
//   return reader.read().then(processText);
// });
    


  //   console.log(blob)
  

  //   req.on('end', () => {
  //     // `data` now contains the entire request body
  //     const formData = new URLSearchParams(data);

  //     // Extract form fields
  //     const formFields = {};
  //     formData.forEach((value, key) => {
  //       formFields[key] = value;
  //     });
  // })

  //     // Log form fields
  //     console.log('Form Fields:', formFields);

      // Your logic to handle form data goes here


    // return Response.json({ name, email })

    // const newUserData = {
    //   name: req.body.name,
    //   email: req.body.email,
    // };
  
    // if (req.files.length > 0) {
    //   const uploader = async (path) => await uploads(path, "rahtech/avatars");
  
    //   const file = req.files[0];
    //   const { path } = file;
  
    //   const avatarResponse = await uploader(path);
    //   fs.unlinkSync(path);
    //   newUserData.avatar = avatarResponse;
    // }
  
    // const user = await User.findByIdAndUpdate(req.user._id, newUserData);
  
    // res.status(200).json({
    //   user,
    // });
    return NextResponse.json(
      { message: "updated with success" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
