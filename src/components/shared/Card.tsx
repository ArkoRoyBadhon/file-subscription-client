
import { DownloadIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }:any) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <Link href={`/product/${product?._id}`}>
      <Image width={500} height={500} className="w-full h-[300px]" src={product.image} alt={product.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          premium
        </span>
          <DownloadIcon />
      </div>
        </Link>
    </div>
  );
};

export default ProductCard;
