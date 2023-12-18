import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function checkAtuh() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check?auth=${
      cookies().get("authorization")?.value
    }`
  );
  const res = await data.json();

  return res;
}

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/me") ||request.nextUrl.pathname.startsWith("/address")) {
    const isAuth = await checkAtuh();
    if (
      isAuth.message === "jwt expired" ||
      isAuth.message === "jwt malformed" ||
      isAuth.message === "unauthorized"
    ) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/login");
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    const isAuth = await checkAtuh();
    if ((isAuth.message ==="isAuth")) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
    }
  }
}
