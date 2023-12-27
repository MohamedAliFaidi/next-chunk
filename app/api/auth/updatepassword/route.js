import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    return NextResponse.json({ message: "succed" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
