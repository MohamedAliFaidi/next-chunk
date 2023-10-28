// const getProducts = async () => {
//   const data = await fetch(`http://localhost:4000/api/products/getall`,

//   );
//   const products = await data.json();
//   return products;
// };
import ListProducts from "../components/products/ListProducts";
export default async function Home() {
  // const products = await getProducts();

  const getProducts = async () => {
    const data = await fetch(`http://localhost:3000/api/products/getall`, {
    cache: "no-store",
    method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });  if (!data.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    const products = await data.json();
    return products;
  };

  const products = await getProducts();
  console.log(products);

  return <> <ListProducts products={products} /> </>;
}
