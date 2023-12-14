import { NextResponse } from "next/server";
import dbConnet from "../../../../helper/db";
import Address from "../../../../helper/adress.model";



export async function GET(req) {
  try {
    dbConnet();
    const addresses = await Address.find({
      userId: req.query?.url,
    });
    return NextResponse.json({ addresses });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
