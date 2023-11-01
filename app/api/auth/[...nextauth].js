import nextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../../helper/user.model";

import dbConnect from "../../../../helper/db";

import bcrypt from "bcryptjs";

export default async function auth(req, res) {
  return await nextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          await dbConnect();
          const { email, password } = credentials;
          const user = User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error("Invalid  Password");
          }
          return user;
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXT_AUTH_SECRET,
  });
}
