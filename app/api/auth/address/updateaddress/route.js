import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db";
import Address from "../../../../../helper/adress.model";

export async function PUT(req) {
  try {
    const { address, id } = await req.json();
    await dbConnet();
    const updated = await Address.findByIdAndUpdate(id, address);
    const data = await updated.save();
    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
