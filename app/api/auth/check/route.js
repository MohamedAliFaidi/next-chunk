import { NextResponse } from "next/server";

import fs from "fs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { headers } from 'next/headers'


export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isauth = searchParams.get("auth");
    const publicKey = fs.readFileSync("./public_key.pem");
    const x = jwt.verify(isauth, publicKey, { algorithms: ["RS256"] });
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

    if (!isauth || (x && x.exp < currentTime)) {
      cookies().delete("authorization"); // The token is expired
      cookies().delete("email");

      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    } else {
      // The token is not expired
      return NextResponse.json({ message: "isAuth" }, { status: 200 });
    }
  } catch (error) {
    cookies().delete("authorization");
    cookies().delete("email");
    
    

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
