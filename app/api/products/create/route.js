
import { newProduct } from "../../../../backend/controllers/productController";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    
    const data = await newProduct(body);
    const response = NextResponse.json(data, { status: 201 });
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
