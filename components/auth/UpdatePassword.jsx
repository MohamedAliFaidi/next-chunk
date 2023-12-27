"use client";

import AuthContext from "../../context/AuthContext";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { validatePasword } from "../../helper/validator";

const UpdatePassword = () => {
  const { error, updatePassword, clearErrors } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await updatePassword({
      currentPassword,
      newPassword,
    });
  };

  const verifyAndSetPassword = useCallback(
    (password, set, err) => {
      if (!validatePasword(password)) {
        err(true);
      } else {
        err(false);
      }
      set(password);
    },
    [validatePasword]
  );

  useEffect(() => {
    if (newPasswordError || passwordError) setIsDisabled(true);
    else setIsDisabled(false);
  }, [passwordError, newPasswordError]);

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-5 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Update Password</h2>

          <div className="mb-4">
            <label className="block mb-1"> Current Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              required
              value={currentPassword}
              onChange={(e) => {
                verifyAndSetPassword(
                  e.target.value,
                  setCurrentPassword,
                  setPasswordError
                );
              }}
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mb-2">
            Passworsd must includes characters Number and One
              Special Character. at least 6 characters long.
            </p>
          )}

          <div className="mb-4">
            <label className="block mb-1"> New Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              required
              value={newPassword}
              onChange={(e) => {
                verifyAndSetPassword(
                  e.target.value,
                  setNewPassword,
                  setNewPasswordError
                );
              }}
            />
          </div>
          {newPasswordError && (
            <p className="text-red-500 text-sm mb-2">
              Passworsd must includes characters Number and One
              Special Character. at least 6 characters long.
            </p>
          )}

          <button
            disabled={isDisabled}
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
