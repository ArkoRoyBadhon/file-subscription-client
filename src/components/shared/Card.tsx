"use client";
import { Bookmark, DownloadIcon, PinOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetProductQuery } from "@/redux/features/product/product.api";
import { setDownloadedItems } from "@/redux/features/auth/auth.slice";
import { IProduct } from "@/types/productType";
import { addProduct, removeProduct } from "@/redux/features/product/product.slice";

const ProductCard = ({ product }: { product: IProduct }) => {
  const productId = product?._id;
  const { data, isSuccess, isLoading } = useGetProductQuery({ productId });
  const { token, user } = useAppSelector((state) => state.auth);
  const { type } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/download/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      if (response.ok && data.data.tags.label === "Premium") {
        dispatch(setDownloadedItems(user?.downloadedItems! + 1));
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", data?.data?.fileName || "file");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error: any) {
      console.error("Error downloading the file:", error);
      toast.error(
        error?.message || "Failed to download. Please check your subcription"
      );
    }
  };

  const handleCollectionRemove = () => {
    dispatch((removeProduct(productId!)));
    toast.success("Successfully remove from  collections");
  };
  const handleCollection = () => {
    dispatch(addProduct(product));
    toast.success("Save to My Collections");
  };

  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg m-4 relative">
      <span className="absolute top-0 right-0 inline-block rounded-bl-full px-5 py-1 text-sm font-semibold  mb-2 capitalize bg-btnColor text-white">
        {product?.tags?.label}
      </span>
      <Link href={`/product/${product?._id}`}>
        <Image
          width={500}
          height={500}
          className="w-full h-[300px] object-cover object-center"
          // src={product.image}
          src="/images/img1.jpg"
          alt={product?.fileName || ""}
        />
        <div className="px-6 pt-3">
          <div className="text-xl font-bold text-primaryTxt">
            {product.fileName}
          </div>
        </div>
      </Link>
      <div className="px-6 py-2 flex justify-between">
        <p className=" text-base line-clamp-1 text-primaryTxt">
          {product.description}
        </p>
      </div>
      <div className="flex justify-end items-center gap-2 text-primaryTxt">
        {type === "collection" ? (
          <Button
            onClick={() => handleCollectionRemove()}
            size="icon"
            variant="ghost"
          >
            <PinOff />
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleCollection()}
              size="icon"
              variant="ghost"
            >
              <Bookmark />
            </Button>
            <Button onClick={handleDownload} size="icon" variant="ghost">
              {/* <a href={product.fileUrl} title="Download"> */}
              <DownloadIcon />
              {/* </a> */}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
