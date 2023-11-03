// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import { NextResponse,NextRequest } from "next/server"

export  async function GET(req = NextRequest,  NextResponse ) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token =  getToken({ req })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    console.log(token)
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 })
  }
    return NextResponse.json({ token })
}