import { NextResponse } from "next/server";



export async function GET(req,{ params }) {
  try {


    const email =req.nextUrl.searchParams.get('email');

    const sendEmail = await fetch(process.env.BACKEND_URL+"/api/isemail/"+email)
    const data = await sendEmail.json()
  
       NextResponse.redirect( new URL('/register?code='+data.message.code, req.url))
  

    return NextResponse.json({success:data.message.code})
    
    
 
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
