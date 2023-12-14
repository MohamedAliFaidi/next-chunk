import { NextResponse } from "next/server";
import fs from "fs";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isauth = searchParams.get("auth");
    const publicKey = fs.readFileSync("./public_key.pem");
    jwt.verify(isauth, publicKey, { algorithms: ["RS256"] });
    return NextResponse.json({ message: "isAuth" }, { status: 200 });
  } catch (error) {
    if (error.message == "jwt expired")
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    else return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
