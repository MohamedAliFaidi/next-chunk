import { getAll } from "../../../../backend/controllers/productController";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    
    const data = await getAll();
    const response =  NextResponse.json(data, { status: 200 });
    response.headers.set("cache-control", "no-store")
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
