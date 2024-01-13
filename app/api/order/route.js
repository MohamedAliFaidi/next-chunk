import { NextResponse } from "next/server";
import Order from "../../../helper/order.model";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(
      "||=============================================================================================================================||"
    );
    console.log("car items : ", body.cart.cartItems);
    console.log(
      "||=============================================================================================================================||"
    );
    console.log("checkout info  : ", body.cart.checkoutInfo);
    console.log(
      "||=============================================================================================================================||"
    );
    console.log("shipping info : ", body.shippingInfo);
  
    console.log(
      "||=============================================================================================================================||"
    );
    console.log("user : ", body.user);
    const newOrder = {
      shippingInfo: body.shippingInfo,
      user: body.user,
      orderItems: body.cart.cartItems,
      checkoutInfo: body.cart.checkoutInfo,
    };
    const order = await Order.create(newOrder);
    console.log(
      "||=============================================================================================================================||"
    );
    console.log(" new order created  :", order);
    console.log(
      "||=============================================================================================================================||"
    );
  
    return NextResponse.json({ message: "ok" });
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({error});

    
  }
 
}
