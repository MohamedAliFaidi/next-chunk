"use client";

import {  getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let data;
  if (typeof window !== "undefined") {
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
  const [user, setUser] = useState(data || null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const updateAddress = async (id, address) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/updateaddress`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({address,id}),
        }
      );

      if (data?.ok) {
        setUpdated(true);
        router.replace(`/address/${id}`);
        return data;
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

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
        if (res.ok) {
          toast.success(res.statusText);
          router.push("/login");
          return await res.json();
        }
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
        updateAddress,
        updated,
        setUpdated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
