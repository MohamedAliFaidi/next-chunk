import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db"
import Address from "../../../../../helper/adress.model";

export async function PUT(req) {
  try {
    console.log(await req.json());

    return NextResponse.json({  });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}