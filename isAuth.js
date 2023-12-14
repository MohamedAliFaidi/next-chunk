import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const auth = cookies().get("authorization")

  if (!auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const check = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check?auth=${auth.value}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!check.ok) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
// NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);

export const config = { matcher: ["/me"] };

// See "Matching Paths" below to learn more
