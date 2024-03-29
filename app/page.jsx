// export const runtime = "edge";

// import { Slides } from "../components/layout/Carousel";
// import ProductCard from "../components/products/ProductCard";
// const getProducts = async () => {

//   const data = await fetch(`${process.env.BACKEND_URL}/api/products`, {
//     cache: "no-store",
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       resperpage: 3,
//     },
//   });
//   if (!data.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   const products = await data.json();
//   return products;
// };
// async function page() {

//   const data = await getProducts();
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex justify-center items-center w-full md:w-4/5 h-2/6">
//         <Slides />
//       </div>
//       <hr className="w-full border-t-2 border-gray-200 my-10" />

//       <div className="m-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-24 w-full">
//         <h1 className="text-3xl font-bold">Mobiles</h1>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[0]} />
//         </div>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[1]} />
//         </div>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[2]} />
//         </div>
//       </div>
//       <hr className="w-full border-t-2 border-gray-200 my-10" />

//       <div className="m-10 flex flex-col md:flex-row justify-between items-center px-4 md:px-24 w-full">
//         <h1 className="text-3xl font-bold">Accessoires</h1>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[0]} />
//         </div>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[1]} />
//         </div>
//         <div className="my-4 md:my-0">
//           <ProductCard product={data?.products[2]} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;

import ListProducts from "../components/products/ListProducts";

import queryString from "query-string";
import { revalidatePRoducts } from "../helper/revalidate";

const getProducts = async (params) => {

  revalidatePRoducts();
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
    next: { tags: ["products"] },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!data.ok) {
    console.log(data)
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
