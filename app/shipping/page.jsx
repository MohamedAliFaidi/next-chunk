import Shipping from "../../components/cart/Shipping";
import { cookies } from "next/headers";

const  getAddresses = async () => {
  const unique = cookies().get("email")?.value;
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
    const data = await getAddresses();

  
  return (
    <Shipping addresses={data.addresses}/>
  )
}

export default page