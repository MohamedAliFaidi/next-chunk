import Profile from "../../components/auth/Profile";
export const runstime = "edge";
import { decode } from "next-auth/jwt";

import { cookies } from "next/headers";

async function page(props) {
  const store = cookies();
  const token = store.get("next-auth.session-token");
  const decoded = await decode({
    token: token.value,
    secret: process.env.NEXTAUTH_SECRET,
  });


  console.log(decoded);

  return (
    <div>
      <Profile />
    </div>
  );
}

export default page;
