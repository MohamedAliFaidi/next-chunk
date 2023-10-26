const getProducts = async () => {
  const data = await fetch(`http://localhost:3000/api/products/getall`,

  );
  const products = await data.json();
  return products;
};

import ListProducts from "../components/products/ListProducts";
export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <ListProducts products={products} />
    </>
  );
}
