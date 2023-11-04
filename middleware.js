import { withAuth } from "next-auth/middleware";
export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token?.user?.role == "user",

  },
});

export const config = { matcher: ["/me"] };
