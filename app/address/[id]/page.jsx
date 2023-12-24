import React from "react";
import UpdateAdress from "../../../components/user/UpdateAdress";

const getAddresse =async (id) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/getone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }
  );
  const addresse = await data.json();
  return addresse;
}

async function page({ params }) {
  const data = await getAddresse(params.id);

  return (
    <div>
      <UpdateAdress address={data.addresse} id={data.addresse?._id} />
    </div>
  );
}

export default page;
