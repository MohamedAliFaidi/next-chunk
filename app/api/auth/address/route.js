import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import Address from "../../../../helper/adress.model";

export async function POST(req) {
  try {
    const body = await req.json();
    console;log(body);
     dbConnet();
    const address = await Address.create(body);
    return NextResponse.json({ address });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
