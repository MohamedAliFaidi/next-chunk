import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import User from "../../../../helper/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import fs from "fs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await dbConnet();
    const user = await User.findOne({ email }).select("+password +createdAt");
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return NextResponse.json(
          { message: "invalid password" },
          { status: 401 }
        );
      } else {
        const privateKey = fs.readFileSync("./private_key.pem");
        const oneDay = 24 * 60 * 60;
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + oneDay,
            data: { _id: user._id, email: user.email, name: user.name },
          },
          privateKey,
          { algorithm: "RS256" }
        );
        cookies().set("authorization", token);
        cookies().set("email", user.email);
        return NextResponse.json(
          {
            message: "success",
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
              createdAt: user.createdAt,
            },
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
