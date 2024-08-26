"use client";
import ProfileLinks from "@/components/client/ProfileLinks";
import { useAppSelector } from "@/redux/hook";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <div className="container_main grid grid-cols-1 lg:grid-cols-10 gap-5 py-5 h-[calc(100vh-65px)]">
      <div className="lg:col-span-2 border p-5 flex lg:flex-col gap-2 rounded-md">
        <ProfileLinks />
      </div>
      <div className="lg:col-span-8 border p-5 rounded-md">{children}</div>
    </div>
  );
};

export default ProfileLayout;
