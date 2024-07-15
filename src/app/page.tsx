import Features from "@/components/home/Features";
import TopSections from "@/components/home/TopSections";
import ProductCard from "@/components/shared/Card";
import { productsFake } from "@/mocks/cardData";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <TopSections />
      <div>
        <Features />
      </div>
      <div className="container_main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productsFake.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
