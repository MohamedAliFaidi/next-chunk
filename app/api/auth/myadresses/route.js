import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import Address from "../../../../helper/adress.model";

export async function GET(req) {
  try {
    await dbConnet();
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");

    console.log(searchParams);
    const addresses = await Address.find({
      userId: email,
    });
    console.log(addresses);
    return NextResponse.json({ addresses });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
