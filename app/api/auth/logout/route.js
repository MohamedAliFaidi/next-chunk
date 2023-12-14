"use server"

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
    cookies().delete("authorization");
  try {
    return NextResponse.json(
      { messsage: "logged out with success" },
      { status: 300 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
