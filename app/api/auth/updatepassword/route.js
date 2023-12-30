import { NextResponse } from "next/server";
import dbConnect from "../../../../helper/db";
import User from "../.../../../../../helper/user.model"
import bcrypt from "bcrypt"

export async function PUT(req) {
  try {
   await dbConnect()
   const { currentPassword, newPassword , id } = await req.json()
   const user = await User.findById(id).select("+password");
   const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    user.password
  );   
    if(!isPasswordMatched){
      return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });

    }
    user.password = newPassword
    await user.save()
    return NextResponse.json({ message: "succed" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
