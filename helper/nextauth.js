import { getServerSession } from "next-auth";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [], // rest of your config
};

// Use it in server contexts
export function auth(...args) {
  return getServerSession(...args, config);
}
