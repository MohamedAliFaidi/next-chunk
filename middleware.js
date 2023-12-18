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
  if (request.nextUrl.pathname.startsWith("/me")) {
    const isAuth = await checkAtuh();
    if (isAuth.message == "jwt expired" || "jwt malformed" ) {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/logout")
        .then(async (res) => {
          return await res.json();
        })
        .catch((err) => console.log(err));
      return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/login");
    }
  }
}
