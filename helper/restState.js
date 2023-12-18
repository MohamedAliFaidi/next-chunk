"use server";
import { cookies } from "next/headers";
export async function reset() {
    if (!cookies().has("authorization")) {
        console.log('not auth')
    }
  }