import { NextResponse } from "next/server";
import Prom from "../../../../../helper/promise.model"
import dbConnect from "../../../../../helper/db"

export async function GET(req, ) {
    try {
        await dbConnect();
        const email = req.nextUrl.searchParams.get('email');
        const deleted = await Prom.deleteMany({email: email}).select('+password')

        return NextResponse.json({ data: deleted });
    } catch (error) {
        console.log(error);
        return NextResponse.error(error, { status: 500 });
    }
}
