"use client";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const router = useRouter();

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
    <>
   <Card className="mt-6 w-full sm:w-96">
  <CardHeader color="blue-gray" className="relative h-56">
    <img
      alt="card-image"
      className="absolute h-full w-full object-cover"
      src={product.images[0].url}
    />
  </CardHeader>
  <CardBody>
    <Typography
      onClick={() => router.push(`/product/${product._id}`)}
      variant="h5"
      color="blue-gray"
      className="mb-2"
    >
      {product.name}
    </Typography>

    <Typography className="line-clamp-3 overflow-hidden">
      {" "}
      {product.description.length > 100
        ? `${product.description.substr(0, 100)}...`
        : product.description}
    </Typography>
  </CardBody>
  <CardFooter>
    <Button className="bg-orange-700 text-black" onClick={addToCartHandler}>Add To Cart</Button>
  </CardFooter>
</Card>
    </>
  );
};

export default ProductCard;
