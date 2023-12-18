import React from "react";
import UpdateAdress from "../../../components/user/UpdateAdress";
import { cache } from "react";

const getAddresse = cache(async (id) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/getone`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }
  );
  const addresse = await data.json();
  return addresse;
}, 3600);

async function page({ params }) {
  const data = await getAddresse(params.id);

  return (
    <div>
      <UpdateAdress address={data.addresse} id={data.addresse._id} />
    </div>
  );
}

export default page;
