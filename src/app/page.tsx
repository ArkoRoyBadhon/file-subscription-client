import FreeFile from "@/components/home/FreeFile";
import Plans from "@/components/home/plans";
import Subscribe from "@/components/home/Subscribe";
import Features from "@/components/home/Features";
import TopSections from "@/components/home/TopSections";
import ProductCard from "@/components/shared/Card";
import { productsFake } from "@/mocks/cardData";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <TopSections />
      <Features />
      {/* <div className="container_main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productsFake.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div> */}
      <Plans />
      <FreeFile />
      <Subscribe />
    </div>
  );
};

export default Home;
