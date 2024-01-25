import { NextResponse } from "next/server";
import User from "../../../../helper/user.model"



export async function POST(req) {
  try {

    const {name,email,password  } = await req.json()
    const user  = await  User.findOne({email:email})
    if(user){
      return NextResponse.json( {message : "user already exist"}, { status: 400 });

    }
    console.log(email,password)
    const sendEmail = await fetch(process.env.BACKEND_URL+"/api/isemail",{
      method:"POST",
      headers :{
        "Content-type":"application/json"
      },
      body : JSON.stringify({name,email,password})
    })
    const data = await sendEmail.json()
    console.log(data)



    return NextResponse.json({success:data})
    
    
 
  } catch (error) {
    console.log(error);
    return NextResponse.error(error, { status: 500 });
  }
}
