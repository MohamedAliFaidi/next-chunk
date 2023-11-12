export const runtime = "edge";

import HomeList from "../components/products/HomeList";
import Client from "../components/ClientWrap";
import { Slides } from "../components/layout/Carousel";
async function page() {
  const getProducts = async () => {
    const data = await fetch(`${process.env.BACKEND_URL}/api/products`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        resperpage: 5,
      },
    });
    if (!data.ok) {
      throw new Error("Failed to fetch data");
    }
    const products = await data.json();
    return products;
  };

  const data = await getProducts();
  return (
    <div>
      <Client>
        <center>
          <div className="flex justify-center items-center w-4/5 h-2/6">
            <Slides />
          </div>
        </center>
      </Client>
      <div className="flex justify-center items-center  mb">
        <HomeList products={data.products} />
      </div>
    </div>
  );
}

export default page;
