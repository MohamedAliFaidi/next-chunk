import { NextResponse } from "next/server";
import Prom from "../../../../../helper/promise.model"
import dbConnect from "../../../../../helper/db"

export async function GET(req, ) {
  try {
    await dbConnect();
    const code = req.nextUrl.searchParams.get('code');
    console.log(code)
    const isemail = await Prom.find({code:code})
    
    return NextResponse.json({ data: isemail });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
