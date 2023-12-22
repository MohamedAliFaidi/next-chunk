import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function checkAtuh() {
  "use server";
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check?auth=${cookies()
      .get("authorization")
      ?.value.trim()}`
  );
  const res = await data.json();

  return res;
}

export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/me") ||
    request.nextUrl.pathname.startsWith("/address")
  ) {
    const isAuth = await checkAtuh();
    if (
      isAuth.message === "jwt expired" ||
      isAuth.message === "jwt malformed" ||
      isAuth.message === "unauthorized"
    ) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(async (res) => await res?.json())
        .catch((err) => console.log(err));
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/login");
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    const isAuth = await checkAtuh();
    if (isAuth.message === "isAuth") {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
    }
  }
}


