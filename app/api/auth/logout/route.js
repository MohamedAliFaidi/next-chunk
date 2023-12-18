"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  cookies().delete("authorization");

  return NextResponse.json(
    { messsage: "logged out with success" },
    { status: 300 }
  );
}
