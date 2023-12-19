import { cookies } from "next/headers";
import Profile from "../../components/auth/Profile";
import { cache } from "react";


const getAddresses = cache(async () => {
  const unique = cookies().get("email")?.value;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/myadresses`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unique }),
    }
  );
  const addresses = await data.json();
  return addresses;
}, 3600);
async function page() {
  const data = await getAddresses();
  return (
    <div>
      <Profile addresses={data.addresses} />
    </div>
  );
}

export default page;
