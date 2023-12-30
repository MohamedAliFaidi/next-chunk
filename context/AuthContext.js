"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { revalidateAdresses } from "../helper/revalidate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let data;
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = document.cookie.split("=")[1]?.split(";")[0];
      data = JSON.parse(localStorage.getItem("user"));
      fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/check?auth=" + auth
      ).then(async (res) => {
        const data = await res.json();
        if (
          data.message === "jwt expired" ||
          data.message === "jwt malformed"
        ) {
          localStorage.removeItem("user");
          setUser(null);
        } else setUser(JSON.parse(localStorage.getItem("user")));
      });
    }
  }, []);

  const [user, setUser] = useState(data || null);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/updatepassword`,
        {
          method: "PUT",
          body: JSON.stringify({ currentPassword, newPassword, id: user._id }),
        }
      );

      if (data?.ok) {
        router.replace("/me");
        toast.success("password updated succefully");
      } else if (!data?.ok) {
        const res = await data.json();
        setError(res.message);
      }
    } catch (error) {
      console.error(error.response);
      setError(error?.message);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      console.log(formData);

      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me/update`,
        {
          method: "POST",
          body: formData,
        }
      );
      setLoading(false);
      if (data?.ok) {
        console.log(data);
        // loadUser();
        await data
          .json()
          .then((res) => {
            if (res.validated) {
              localStorage.removeItem("user");

              localStorage.setItem("user", JSON.stringify(res.validated));
              setUser(res.validated);
            }
          })
          .catch((err) => {
            setLoading(false);
            setError(error?.message);
          });
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  };

  const updateAddress = async (id, address, setter) => {
    try {
      setUpdated(true);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/updateaddress`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, id }),
        }
      );

      if (data?.ok) {
        toast.success("Address Updated");
        await revalidateAdresses();
        router.push("/me")
        return data;
      }
    } catch (error) {
      toast.error(error?.message);
      setError(error?.message);
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
      setError(error?.message);
      toast.error(error?.message);
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
      const res = await data.json();
      if (data.ok) {
        toast.success("address addedd successfully");
        await revalidateAdresses();
        router.push("/me");
      } else if (!data.ok) {
        toast.error(res.message);
        setError(res.message);
      }
    } catch (error) {
      console.log(error, "here error");
      setError(error.message);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/address/deleteaddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (data.ok) {
        toast.success("address addedd successfully");
        await revalidateAdresses();

        router.push("/me");
      } else {
        setError;
        toast.error(data.message);
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  const loginUser = async (email, password, setPassword) => {
    const data = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error);
      }
      return res;
    });
    if (data.ok) {
      const user = await data.json();
      setUser(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      setPassword("");
      toast.success("Login successful");
      router.push("/me");
    } else {
      toast.error(data.statusText);
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
        updated,
        loading,
        setUser,
        registerUser,
        clearErrors,
        addNewAddress,
        updateAddress,
        deleteAddress,
        setUpdated,
        updateProfile,
        updatePassword,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
