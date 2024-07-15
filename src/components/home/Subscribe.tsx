import Link from "next/link";
import React from "react";

const Subscribe = () => {
  return (
    <section className="mt-[60px] mb-[40px] py-[40px] bg-gray-200">
      <div className="flex flex-col justify-center items-center">
        <h6 className="text-[32px] leading-[150%] tracking-tighter font-bold capitalize">Subscribe today and start creating</h6>
        <Link
          href="/signup"
          className="bg-red-700 font-bold text-white px-[20px] py-[12px] rounded-lg mt-[20px]"
        >
          Subscribe
        </Link>
      </div>
    </section>
  );
};

export default Subscribe;
