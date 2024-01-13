import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import Address from "../../../../helper/adress.model";

export async function POST(req) {
  try {
    const body = await req.json();
    dbConnet();
    const address = await Address.create(body);
    return NextResponse.json({ address });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "all fields are required" },
      { status: 403 }
    );
  }
}
