import { Bookmark, DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const ProductCard = ({ product }: any) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg m-4 relative">
      <span className="absolute top-0 right-0 inline-block rounded-bl-full px-5 py-1 text-sm font-semibold  mb-2 capitalize bg-btnColor text-white">
        premium
      </span>
      <Link href={`/product/${product?._id}`}>
        <Image
          width={500}
          height={500}
          className="w-full h-[300px] object-cover object-center"
          src={product.image}
          alt={product.name}
        />
        <div className="px-6 pt-3">
          <div className="text-xl font-bold text-primaryTxt">{product.name}</div>
        </div>
      </Link>
      <div className="px-6 py-2 flex justify-between">
        <p className=" text-base line-clamp-1 text-primaryTxt">
          {product.description}
        </p>
        <div className="flex items-center gap-2 text-primaryTxt">
          <Button size="icon" variant="ghost">
            <Bookmark />
          </Button>
          <Button size="icon" variant="ghost">
            <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
