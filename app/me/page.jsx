import Profile from "../../components/auth/Profile"

import { getToken } from "next-auth/jwt"

import { NextRequest } from "next/server"



async function page() {


  return (
    <div>
        <Profile />
    </div>
  )
}

export default page