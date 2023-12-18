"use server";
import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db"
import Address from "../../../../../helper/adress.model";

export async function POST(req) {
  try {
    await dbConnet();
    const { id } = await req.json();
    const addresse = await Address.findOne({
      _id: id,
    });
    return NextResponse.json({ addresse });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
