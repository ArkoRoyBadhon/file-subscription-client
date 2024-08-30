"use client";
import { FileWarning } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const StripeCancel = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/profile");
    }, 3000);
  }, [router]);
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <FileWarning style={{ fontSize: "50px" }} />
        <p className="text-primaryTxt text-[20px] font-semibold">Cancel</p>
      </div>
    </div>
  );
};

export default StripeCancel;
