"use client";
import Link from "next/link";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Client from "../ClientWrap";

const ProductItem = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  };
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={
                !product?.images[0] ? "/image_1024.png" : product?.images[0].url
              }
              alt="product anme"
              height="240"
              width="240"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              href={`/product/${product._id}`}
              className="hover:text-blue-600"
            >
              {product.name}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <Client>
                    <StarRatings
                      rating={product?.ratings}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="18px"
                      starSpacing="1px"
                      name="rating"
                    />
                  </Client>
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{product?.ratings}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              ${product?.price}
            </span>

            <div className="my-3">
              <button
                className="px-4 py-2 inline-block text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-700 cursor-pointer"
                onClick={addToCartHandler}
              >
                {" "}
                Add to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
