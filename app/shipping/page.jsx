import Shipping from "../../components/cart/Shipping";
import { cookies } from "next/headers";
import { getAddresses } from "../me/page";
async function page() {
    const unique = cookies().get("email").value
    const data = await getAddresses(unique);

  
  return (
    <Shipping addresses={data.addresses}/>
  )
}

export default page