import { cookies } from "next/headers";
import Profile from "../../components/auth/Profile";
import { cache } from "react";

export const runtime = "edge";

const getAddresses = cache(async () => {
  const unique = cookies().get("email")?.value;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/myadresses?email=${unique}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const addresses = await data.json();
  return addresses;
}, 3600);
async function page() {
  const data = await getAddresses();
  console.log(data.addresses, "here");
  return (
    <div>
      <Profile addresses={data.addresses} />
    </div>
  );
}

export default page;
