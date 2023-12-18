"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let data;
  if (typeof window !== "undefined") {
    console.log(document.cookie);
    data = JSON.parse(localStorage.getItem("user"));
    fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/auth/check?auth=" +
        getCookie("authorization")
    ).then(async (res) => {
      const data = await res.json();
      if (data.message === "jwt expired" || data.message === "jwt malformed") {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
  }
  console;
  const [user, setUser] = useState(data || null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const registerUser = async ({ name, email, password }) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include",
        }
      ).then(async (res) => {
        return await res.json();
      });
      if (data.message) {
        setError(data.message);
      } else {
        if (data.data._id) {
          toast.success("welcome " + data.data.name);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  const addNewAddress = async (address) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(address),
        }
      );

      if (data.ok) {
        toast.success("address addedd successfully");
        router.push("/me");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        registerUser,
        clearErrors,
        addNewAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
