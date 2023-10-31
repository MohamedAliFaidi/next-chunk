const revalidate = 3600; // revalidate the data at most every hour
import { NextResponse } from "next/server";
import { cache } from "react";

const getPoduct = cache(async (id) => {
  const data = await fetch(
    `${process.env.BACKEND_URL}/api/products/getproduct/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const products = await data.json();
  return products;
}, revalidate);

export async function POST(req) {

    try {

        const body = await req.json();
    const product= await getPoduct(body.id);

    const response = NextResponse.json(product, { status: 200 });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
