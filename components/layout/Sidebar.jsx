"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const logoutHandler = async () => {
    await fetch("/api/auth/logout")
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        <>
          <li>
            {" "}
            <Link
              href="/admin/products/new"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              New Product <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/products"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Products <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/orders"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Orders <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <li>
            {" "}
            <Link
              href="/admin/users"
              className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
            >
              All Users <span className="text-red-500">(Admin)</span>
            </Link>
          </li>

          <hr />
        </>

        <li>
          {" "}
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>

        <li>
          {" "}
          <button
            onClick={logoutHandler}
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
