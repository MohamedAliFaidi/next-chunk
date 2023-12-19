"use server";
import { NextResponse } from "next/server";
import dbConnet from "../../../../../helper/db";
import Address from "../../../../../helper/adress.model";

export async function POST(req) {
  try {
    await dbConnet();
    const { unique } = await req.json();
    const addresses = await Address.find({
      userId: unique,
    });
    return NextResponse.json({ addresses });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
