"use client";
import { clearPlanData } from "@/redux/features/plans/plan.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useGetAuthorQuery } from "@/redux/features/auth/auth.api";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetAuthorQuery(undefined);
  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      console.log("get auth", data.data);
      dispatch(setUser(data.data));
    }
    Cookies.remove("redirect");
  }, [isSuccess]);

  
  setTimeout(() => {
    router.push("/profile")
  }, 3000);

  return (
    <main className="max-w-6xl mx-auto p-10 text-center border border-green-400 m-10 rounded-md">
      <div className="mb-10">
        <p className="text-7xl mb-5">🎉</p>
        <h1 className="text-4xl font-extrabold mb-2 text-green-500">
          Congratulation!
        </h1>
        <h2 className="text-2xl">Your Subscription Started successfully</h2>

        <Link href="/profile">
          <button className="p-3 rounded-xl bg-green-500 text-white hover:bg-green-600 mt-10">
            Go to Profile
          </button>
        </Link>
      </div>
    </main>
  );
}
