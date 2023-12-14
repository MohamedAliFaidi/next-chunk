"use client";

import Link from "next/link";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import { validatePasword, validateEmail } from "../../helper/validator";

const Login = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const loginUser = async (e) => {
    e.preventDefault();
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
      console.log(user);
      setUser(user.data);
      localStorage.setItem("user", JSON.stringify(user.data));
      setPassword("");
      toast.success("Login successful");
      setTimeout(() => {
        router.push("/me");
      }, 1000);
    }
  };

  const verifyAndSetEmail = useCallback(
    (email) => {
      if (!validateEmail(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      setEmail(email);
    },
    [setEmailError, setEmail]
  );

  const verifyAndSetPassword = useCallback(
    (password) => {
      if (!validatePasword(password)) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      setPassword(password);
    },
    [setPasswordError, setPassword]
  );

  useEffect(() => {
    if (emailError || passwordError) setIsDisabled(true);
    else setIsDisabled(false);
  }, [passwordError, emailError]);

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={loginUser}>
        <h2 className="mb-5 text-2xl font-semibold">Login</h2>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => verifyAndSetEmail(e.target.value)}
            required
          />
        </div>
        {emailError && (
          <p className="text-red-500 text-sm mb-2">
            Please enter a valid email address.
          </p>
        )}

        <div className="mb-4">
          <label className="block mb-1"> Password </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="password"
            placeholder="Type your password"
            minLength={6}
            value={password}
            onChange={(e) => verifyAndSetPassword(e.target.value)}
            required
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mb-2">
            Please enter a strong password.
          </p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700"
        >
          Login
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link href="/register" className="text-orange-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
