import { NextResponse } from "next/server";
import { cache } from "react";

const revalidate = 3600; // revalidate the data at most every hour

const getPoducts = cache(async (id) => {
  const data = await fetch(`${process.env.BACKEND_URL}/api/products/getall`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await data.json();
  return products;
}, revalidate);
export async function GET() {
  try {
    const products = await getPoducts();
    const response = NextResponse.json(products, { status: 200 });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
