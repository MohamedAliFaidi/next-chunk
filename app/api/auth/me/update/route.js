import { NextResponse } from "next/server";

export async function PUT(req) {
    console.log(req)
  try {
    return NextResponse.json(
      { message: "updated with success" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
