import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    cookies().delete("authorization");
    return NextResponse.json(
      { messsage: "logged out with success" },
      { status: 300 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
