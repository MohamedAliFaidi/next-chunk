"use client";

// import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (formData) => {
    try {
      setLoading(true)
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/create`,
        {
          method: "POST",
          body: formData,
        }
      );
      if(data.ok){
        setLoading(false)
        toast.success('New product added succefuly')
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
      setError(error.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,

        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
