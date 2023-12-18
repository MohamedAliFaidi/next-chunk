import { cookies } from "next/headers";
import Profile from "../../components/auth/Profile";
import fs from 'fs'

const getAddresses = async () => {
  const unique = cookies().get('email')?.value 
  console.log(unique)
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/myadresses?email=${unique}`);
  console.log(data)

  return data?.addresses;
};
async function page() {
  const addresses = await getAddresses();
  console.log(addresses);
  return (
    <div>
      <Profile />
    </div>
  );
}

export default page;
