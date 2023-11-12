"use client";
import  ProductCard  from "./ProductCard.jsx";
function HomeList({ products }) {
  console.log(products);
  return (
    <div
      x-data="{}"
      x-init="$nextTick(() => {
        let ul = $refs.logos;
        ul.insertAdjacentHTML('afterend', ul.outerHTML);
        ul.nextSibling.setAttribute('aria-hidden', 'true');
    })"
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <div className="grid grid-cols-3 gap-4">
        <ul
          x-ref="logos"
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        >
          {products.map((product) => (
            <li key={product._id} className="flex-shrink-0 w-fit h-fit">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeList;
