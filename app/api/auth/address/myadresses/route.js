"use server";
import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db";
import Address from "../../../../../helper/adress.model";

export async function POST(req) {
  try {
    await dbConnet();
    const { unique } = await req.json();
    console.log(unique)
    const addresses = await Address.find({
      userId: unique,
    });
    console.log(addresses)
    return NextResponse.json({ addresses });
  } catch (error) {
    console.log(error.message);
    return NextResponse.error(error);
  }
}
