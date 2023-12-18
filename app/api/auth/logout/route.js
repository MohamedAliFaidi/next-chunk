import { NextResponse } from "next/server";


export async function GET(req) {
  return NextResponse.json(
    { messsage: "logged out with success" },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          "authorization=; Max-Age=0; Path=/; SameSite=Strict",
          "email=; Max-Age=0; Path=/; SameSite=Strict",
        ],
      },
    }
  );
}
