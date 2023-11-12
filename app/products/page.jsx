import ListProducts from "../../components/products/ListProducts";
export const runtime = "edge";


import queryString from "query-string";

const getProducts = async (params) => {
  const urlParams = {
    keyword: params.keyword,
    page: params.page,
    category: params.category,
    "price[$gte]": params.min,
    "price[$lte]": params.max,
    ratings: params.ratings,
  };
  const query = queryString.stringify(urlParams);

  const data = await fetch(`${process.env.BACKEND_URL}/api/products?${query}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
    },
    
  });
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  const products = await data.json();
  return products;
};
export default async function Home({ searchParams }) {
  const products = await getProducts(searchParams);
  return (
    <>
        <ListProducts products={products} />{" "}
    </>
  );
}