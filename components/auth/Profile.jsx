"use client";

import { useContext } from "react";
// import UserAddresses from "../user/UserAddresses";
import Link from "next/link";

import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <figure className="flex items-start sm:items-center ">
        <div className="relative">
          <Image
            className="w-10 h-10 rounded-full"
            src={user?.avatar ? user?.avatar?.url : "/default_avatar.png"}
            alt="avatar"
            width="40"
            height="40"
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {user?.createdAt?.substring(0, 10)}
          </p>
        </figcaption>
        {/* <UserAddresses /> */}
      </figure>
      <hr className="my-4" />
      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus">+</i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
