import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db";
import Address from "../../../../../helper/adress.model";

export async function POST(req) {
  try {
    await dbConnet();
    const { id } = await req.json();
    const addresse = await Address.findByIdAndDelete(id);
    if (addresse) return NextResponse.json({ addresse });
    else return NextResponse.json({ message: "address not found" });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
