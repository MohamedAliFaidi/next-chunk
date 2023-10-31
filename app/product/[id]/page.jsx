import ProductDetails from "../../../components/products/ProductDetails";

export const runtime = "edge";

const getProductDetails = async (id) => {
  const res = await fetch(`http://localhost:3000/api/products/getone`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  return data;
};

const ProductDetailsPage = async ({ params }) => {
  const data = await getProductDetails(params.id);

  return <ProductDetails data={data} />;
};

export default ProductDetailsPage;
