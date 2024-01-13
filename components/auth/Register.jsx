"use client";

import Link from "next/link";
import { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

import {
  validatePasword,
  validateEmail,
  validateUsername,
} from "../../helper/validator";

const Register = () => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    registerUser({ name, email, password });
  };

  const verifyAndSetUsername = useCallback(
    (username) => {
      if (!validateUsername(username)) {
        setUsernameError(true);
      } else {
        setUsernameError(false);
      }
      setName(username);
    },
    [setUsernameError, setName]
  );

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
    if (usernameError || emailError || passwordError) setIsDisabled(true);
    else setIsDisabled(false);
  }, [passwordError, emailError, usernameError]);

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            value={name}
            onChange={(e) => verifyAndSetUsername(e.target.value)}
            required
          />
        </div>
        {usernameError && (
          <p className="text-red-500 text-xs italic">
            Please enter a valid username. Username must be at least 4
          </p>
        )}

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
          <p className="text-red-500 text-xs italic">
            Please enter a valid email.
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
          <p className="text-red-500 text-xs italic">
            Please enter a strong password.
          </p>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700"
        >
          Register
        </button>

        <hr className="mt-4" />

        <p className="text-center mt-5">
          Already have an account?
          <Link href="/login" className="text-orange-500">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
