import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await fetch(`${process.env.BACKEND_URL}/api/products/create`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const product = await data.json();

    const response = NextResponse.json(product, { status: 201 });
    return response;
  } catch (error) {
    console.log(error);
    const response = NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
    return response;
  }
}
