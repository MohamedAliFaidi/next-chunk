"use client";

import { useState, useContext } from "react";

import AuthContext from "../../context/AuthContext";


const NewAddress = () => {
  const { error, addNewAddress, clearErrors,user } = useContext(AuthContext);


  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhonoNo] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newAddress = {
      userId: user?.email,
      street,
      city,
      state,
      zipCode,
      phoneNo,
    };

    addNewAddress(newAddress);
  };

  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Add new Address</h2>

          <div className="mb-4 md:col-span-2">
            <label className="block mb-1"> Street* </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-3">
            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> City </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Type your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> State </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="text"
                placeholder="Type state here"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-2">
            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> ZIP code </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="Type zip code here"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="mb-4 md:col-span-1">
              <label className="block mb-1"> Phone No </label>
              <input
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                type="number"
                placeholder="Type phone no here"
                value={phoneNo}
                onChange={(e) => setPhonoNo(e.target.value)}
              />
            </div>
          </div>

          

          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700"
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default NewAddress;
