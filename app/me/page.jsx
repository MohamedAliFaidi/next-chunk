import { cookies } from "next/headers";
import Profile from "../../components/auth/Profile";


export const getAddresses = async (unique) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/myadresses`,
    {
      next: { tags: ['addresses']},
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ unique }),
    }
    );
    const addresses = await data.json();
    return addresses;
  }
  async function page() {
  const unique = cookies().get("email")?.value;
  const data = await getAddresses(unique);
  return (
    <div>
      <Profile addresses={data.addresses} />
    </div>
  );
}

export default page;
