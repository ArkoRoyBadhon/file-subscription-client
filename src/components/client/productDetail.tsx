"use client";
import {
  useGetProductQuery,
  useProductDownloadQuery,
} from "@/redux/features/product/product.api";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import LoadingCom from "../shared/Loading";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setDownloadedItems, setUser } from "@/redux/features/auth/auth.slice";
import { toast } from "sonner";

const ProductDetail = ({ productId }: { productId: string }) => {
  const { data, isSuccess, isLoading } = useGetProductQuery({ productId });
  const { token, user } = useAppSelector((state) => state.auth);
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
      if( response.ok && data.data.tags.label === "Premium") {
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
      toast.error(error?.message  || "Failed to download. Please check your subcription")
    }
  };

  if (isLoading) {
    return <LoadingCom />;
  }
  if (isSuccess) {
    return (
      <>
        <div className="mb-[40px]">
          <h1 className="text-[32px] font-semibold leading-[150%]">
            {data.data.category.label}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="w-2/4">
            <Image
              src="/images/download.jpeg"
              height={600}
              width={800}
              alt=""
              className="w-full aspect-video object-cover rounded-lg"
            />
          </div>
          <div className="w-2/4 p-[10px]">
            <div className="border p-[12px] rounded-md">
              {/* <p className="px-[12px] py-[8px] bg-red-200 rounded-md font-bold text-[14px]">
              Love this Item!
            </p> */}
              <p className="text-[22px] font-semibold pt-[12px] pb-[40px] tracking-tighter">
                {data.data.fileName}
              </p>

              <div className="flex gap-[10px] items-center">
                <CheckCircle size={18} />
                <p className="">File Type: {data.data.fileType}</p>
              </div>
              <div className="flex gap-[10px] items-center">
                <CheckCircle size={18} />
                <p className="">Version: {data.data.version}</p>
              </div>
              <div className="flex gap-[10px] items-center">
                <CheckCircle size={18} />
                <p className="">License Type: {data.data.licenseType}</p>
              </div>
              <div className="flex gap-[10px] items-center">
                <CheckCircle size={18} />
                <p className="">Total download: {data.data.downloadCount}</p>
              </div>
              <div className="flex gap-[10px] items-center">
                <CheckCircle size={18} />
                <p className="">Stock: {data.data.stock}</p>
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-btnColor text-white tracking-tighter font-bold mt-[40px] rounded-md py-[8px]"
              >
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-[40px]">
          <div className="w-3/4">
            <strong className="mb-[10px]">Description: </strong>{" "}
            <p className="">{data.data.description}</p>
          </div>
          <div className="w-1/4 pl-[20px]">
            <div className="relative ">
              <div className="flex items-center">
                <div className="absolute w-[10px] h-[10px] left-0 bg-btnColor"></div>
                <p className="ml-[20px] text-[18px] font-semibold">Types</p>
              </div>
              <p className="">{data.data.category.label}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProductDetail;
