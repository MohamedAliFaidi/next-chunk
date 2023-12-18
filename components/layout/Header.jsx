"use client";

import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import { useCallback, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Client from "../ClientWrap";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (document.cookie.split("=")[1]) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check?auth=${
          document.cookie.split("=")[1]
        }`
      )
        .then(async (res) => {
          const data = await res.json();
          if (data.message == ("jwt expired" || "jwt malformed") ) {
            setUser(null);
            localStorage.removeItem("user");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }
    }
  }, []); // const { data } = useSession();

  return (
    <header className="bg-white py-2 border-b" style={{ height: "15vh" }}>
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <p>
                <Image
                  src="/logo.png"
                  height="40"
                  width="40"
                  alt="BuyItNow"
                  style={{ width: "auto", height: "auto" }}
                />
              </p>
            </Link>
          </div>

          <Search />

          <div
            className="flex items-center space-x-2 ml-auto"
            style={{ height: "15vh" }}
          >
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <Client>
                <span className="inline ml-1">
                  Cart (<b>{cart.cartItems?.length}</b>)
                </span>
              </Client>
            </Link>

            {!user ? (
              <Client>
                <Link
                  href="/login"
                  className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                >
                  <i className="text-gray-400 w-5 fa fa-user"></i>
                  <span className="inline ml-1">Sign in</span>
                </Link>
              </Client>
            ) : (
              <Client>
                <Link href="/me">
                  <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={
                        user?.avatar ? user?.avatar?.url : "/default_avatar.png"
                      }
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <div className="space-y-1 font-medium">
                      <p>
                        {user?.name}
                        <time className="block text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </time>
                      </p>
                    </div>
                  </div>
                </Link>
              </Client>
            )}
          </div>

          {/* <div className=" ml-2">
            <button
            type="button"
            className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
            <span className="sr-only">Open menu</span>
            <i className="fa fa-bars fa-lg"></i>
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
