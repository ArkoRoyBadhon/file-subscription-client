import FreeFile from "@/components/home/FreeFile";
import Plans from "@/components/home/plans";
import ProductCard from "@/components/shared/Card";
import { productsFake } from "@/mocks/cardData";
import React from "react";

const Home = () => {
  return (
    <div className="container_main">
      <div className="flex flex-wrap -mx-4">
        {productsFake.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Plans />
      <FreeFile />
    </div>
  );
};

export default Home;
