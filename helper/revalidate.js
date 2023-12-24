"use server";
import { revalidateTag } from "next/cache";


export async function revalidateAdresses() {
  revalidateTag("addresses");

  // ...
}


export async function revalidatePRoducts() {
  revalidateTag("products");

  // ...
}