import { cookies } from "next/headers";
import Login from "../../../components/auth/Login";

import { NextResponse } from "next/server";
function page() {

  


  return (
    <div>
      <Login />
    </div>
  );
}

export default page;
