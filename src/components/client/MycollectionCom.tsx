"use client";
import { useAppSelector } from "@/redux/hook";
import React from "react";
import ProductCard from "../shared/Card";

const MycollectionCom = () => {
  const { products } = useAppSelector((state) => state.product);

  return (
    <div className="mt-[10px]">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No collection yet.
        </div>
      )}
    </div>
  );
};

export default MycollectionCom;
