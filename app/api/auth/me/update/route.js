import { NextResponse } from "next/server";
import User from "../../../../../helper/user.model";
import fs from "fs";
import { NextRequest } from "next/server";
import { uploads } from "../../../../../helper/cloudinary";
import parser from "../../../../../helper/multer";
import nextConnect from "next-connect";
import formidable from 'formidable';
import { IncomingForm } from 'formidable';






export async function POST(req,res) {
  const formData = await req.formData()
  const file = formData.get("image");
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  console.log(buffer)
    return NextResponse.json('done')
}
