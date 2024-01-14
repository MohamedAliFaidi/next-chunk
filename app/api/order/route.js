import { NextResponse } from "next/server";
import Order from "../../../helper/order.model";
import userModel from "../../../helper/user.model";

export async function POST(req) {
  try {
    const body = await req.json();
    const newOrder = {
      shippingInfo: body.shippingInfo,
      user: body.user,
      orderItems: body.cart.cartItems,
      checkoutInfo: body.cart.checkoutInfo,
    };
    const order = await Order.create(newOrder);
    const user = await userModel.findById(body.user);
    await fetch(`${process.env.BACKEND_URL}/api/ordermail`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    return NextResponse.json({ message: "ok", data: order },{status:201});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error },{status:500});
  }
}
