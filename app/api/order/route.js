import { NextResponse } from "next/server";
import Order from "../../../helper/order.model";

export async function POST(req) {
  const body = await req.json();
  console.log("||=============================================================================================================================||");
  console.log("car items : ", body.cart.cartItems);
  console.log("||=============================================================================================================================||");
  console.log("checkout info  : ", body.cart.checkoutInfo);
  console.log("||=============================================================================================================================||");
  console.log("shipping info : ", body.shippingInfo);
  console.log("||=============================================================================================================================||");

  return NextResponse.json({ message: "ok" });
}
