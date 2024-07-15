import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="container_main py-[40px]">
      <div className="mb-[40px]">
        <h1 className="text-[32px] font-semibold leading-[150%]">
          Product name and sample product item name
        </h1>
        <p className="">Web Template</p>
      </div>
      <div className="flex justify-between">
        <div className="w-3/4">
          <Image
            src="/images/download.jpeg"
            height={600}
            width={800}
            alt=""
            className="w-full aspect-video object-cover rounded-lg"
          />
        </div>
        <div className="w-1/4 p-[10px]">
          <div className="border p-[12px] rounded-md">
            <p className="px-[12px] py-[8px] bg-red-200 rounded-md font-bold text-[14px]">
              Love this Item!
            </p>
            <p className="text-[22px] font-semibold pt-[12px] pb-[40px] tracking-tighter">
              Product Name Product name and sample product item name
            </p>

            <div className="flex gap-[10px] items-center">
              <CheckCircle size={18} />
              <p className="">Simple licensing</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <CheckCircle size={18} />
              <p className="">Simple licensing</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <CheckCircle size={18} />
              <p className="">Simple licensing</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <CheckCircle size={18} />
              <p className="">Simple licensing</p>
            </div>

            <button className="w-full bg-red-700 text-white tracking-tighter font-bold mt-[40px] rounded-md py-[8px]">
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-[40px]">
        <div className="w-3/4">
          <strong className="mb-[10px]">Description: </strong>{" "}
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
            veritatis voluptatibus commodi adipisci optio aperiam enim quo,
            asperiores accusantium dolore, voluptate, assumenda alias eos quas
            cumque excepturi reprehenderit quam? Dolorem velit odit dolorum,
            eveniet itaque officiis? Ab saepe suscipit perspiciatis rem quos eum
            fuga, voluptatem labore iusto a aspernatur natus.
          </p>
        </div>
        <div className="w-1/4 pl-[20px]">
          <div className="relative ">
            <div className="flex items-center">
              <div className="absolute w-[10px] h-[10px] left-0 bg-red-700"></div>
              <p className="ml-[20px] text-[18px] font-semibold">Types</p>
            </div>
            <p className="">Web Template</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
