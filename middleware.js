import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req, next) {
  const auth = cookies().get("authorization").value;

  const check = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check?auth=${auth}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(check.ok);

  if (!check.ok) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
}
// NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);

export const config = { matcher: ["/me"] };

// See "Matching Paths" below to learn more
