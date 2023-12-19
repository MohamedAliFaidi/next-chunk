import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import User from "../../../../helper/user.model";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await dbConnet();
    const user = await User.findOne({
      email,
    });
    if (user) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    } else {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      return NextResponse.json(
        {
          data: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt,
            role: newUser.role,
          },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
