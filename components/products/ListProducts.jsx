"use client";

import Filters from "../layout/Filters";
import CustomPagination from "../layout/CustomPagination";

import ProductItem from "./ProductItem";

const ListProducts = (data) => {
  console.log("data", data);  
  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data?.products?.products?.map((product, i) => (
              <div key={i}>
                <ProductItem product={product} />
              </div>
            ))}
          </main>
        </div>
        <CustomPagination
          resPerPage={data?.products.resPerPage}
          productsCount={data?.products?.products.length}
          filteredProductsCount={data?.products.filteredProductsCount
          }
        />{" "}
      </div>
    </section>
  );
};

export default ListProducts;
