import { NextResponse } from "next/server";
import { revalidatePRoducts } from "../../../../helper/revalidate";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await fetch(`${process.env.BACKEND_URL}/api/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const product = await data.json();
    await revalidatePRoducts();
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
