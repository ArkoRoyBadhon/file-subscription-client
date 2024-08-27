"use client";
import React from "react";
import { useUserDownloadQuery } from "@/redux/features/product/product.api";
import DownloadCard from "../shared/DownloadCard";

const MyDownloadCom = () => {
  const { data, isSuccess } = useUserDownloadQuery(undefined);

  return (
    <div className="mt-4">
      {isSuccess && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((download: any) => (
            <DownloadCard
              key={download._id}
              filename={download.filename}
              fileType={download.fileType}
              photo={download.photo}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No downloads yet.
        </div>
      )}
    </div>
  );
};

export default MyDownloadCom;
