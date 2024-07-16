import { assets } from "@/mocks/assets";
import Image from "next/image";

const TopSections = () => {
  return (
    <div className="bg-gray-50">
      <div className="container_main py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold capitalize text-primaryTxt">
            The unlimited creative subscription
          </h1>
          <p className="text-primaryTxt capitalize mt-[12px]">
            Unlimited downloads of 19+ million creative assets. From just
            $16.50/month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[40px] py-10 px-[40px]">
          {assets.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-2">
              <Image src={item.img} alt={item.title} height={200} width={300} className="h-[200px]" />
              <h4 className="text-lg text-primaryTxt font-bold mt-4">{item.title}</h4>
              <p className="text-primaryTxt">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSections;
