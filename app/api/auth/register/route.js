import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import User from "../../../../helper/user.model";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await dbConnet();
    const user = await User.create({
      name,
      email,
      password,
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
