"use client";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import axios from "axios";

const SubProvider = ({ children }: { children: React.ReactNode }) => {
  ////----important(TO PREVENT HYDRATION ERROR)
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/subs/subscription-status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("SUBSCRIPTION STATUS => ", data);
      if (data && data.subscriptions.length === 0) {
        dispatch(setUser(data));
      } else {
        const filterData =
          data &&
          data.subscriptions.filter((kk: any) => !kk.cancel_at && kk.status);

        const dd = { ...data, subscriptions: filterData };
        console.log("qqqqqqq 2", dd);

        dispatch(setUser(dd));
      }
    };

    getSubscriptionStatus();
  }, []);


  return (
    <section>
      {children}
    </section>
  );
};

export default SubProvider;
