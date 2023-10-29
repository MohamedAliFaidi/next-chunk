import ListProducts from "../components/products/ListProducts";
export const runtime = 'edge' 

export default async function Home() {
  const getProducts = async () => {
    const data = await fetch(`${process.env.BASE_URL}/api/products/getall`, {
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

  const products = await getProducts();

  return (
    <>
      {" "}
      <ListProducts products={products} />{" "}
    </>
  );
}



