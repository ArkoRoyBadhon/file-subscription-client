"use client";
import { useGetSubscriptionPlanQuery } from "@/redux/features/plans/plan.api";
import { setPlanData } from "@/redux/features/plans/plan.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const plansData = [
  {
    id: 1,
    title: "Basic",
    description: "A basic plan for personal use.",
    image: "/images/enterprise-illustration-simple-a3523bf30d5359d8d384.svg",
    link: "/pricing/basic",
  },
  {
    id: 2,
    title: "Standard",
    description: "Standard plan for small teams.",
    image: "/images/individuals-illustration-simple-f78b478fea8155aa3396.svg",
    link: "/pricing/standard",
  },
  {
    id: 3,
    title: "Pro",
    description: "Pro plan for large teams.",
    image: "/images/students-illustration-simple-bad2bf8f57436dc5fa8b.svg",
    link: "/pricing/pro",
  },
  {
    id: 4,
    title: "Enterprise",
    description: "Custom solutions for large organizations.",
    image: "/images/teams-illustration-simple-49edde86a6b1a64cf647.svg",
    link: "/pricing/enterprise",
  },
];

const Plans = () => {
  const { data, isSuccess } = useGetSubscriptionPlanQuery(undefined);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handlePlan = (plan: any) => {
  
    if (plan) {
      if (user?.plan === plan?._id) {
        toast.info("Already on this plan");
      } else {
        const userConfirmed = window.confirm("Are you sure you want to select this plan? Your current plan will cancel.");
  
        if (userConfirmed) {
          dispatch(setPlanData(plan));
          router.push("/payment");
        }
      }
    }
  };

  return (
    <section className="py-[60px] pb-[40px] container_main">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primaryTxt">
          Plans and Pricing
        </h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isSuccess &&
          data?.data.map((plan: any, i: number) => (
            <li
              key={plan.id}
              className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in cursor-pointer"
              onClick={() => handlePlan(plan)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-[10px]">
                  {plan.name}{" "}
                  <span
                    className={`bg-btnColor/50 text-white text-[12px] font-thin px-[8px] rounded-md ${
                      user?.plan === plan._id ? "" : "hidden"
                    }`}
                  >
                    owned
                  </span>
                </h3>
                <p className="text-gray-600 mb-6">{plansData[i].description}</p>
                <p className="text-gray-600 text-[14px]">
                  Price: {plan.price === 0 ? "free" : plan.price + " " + "USD"}
                </p>
                <p className="text-gray-600 text-[14px]">Limit: {plan.limit}</p>
                <p className="text-gray-600 text-[14px]">
                  Validity: {plan.expire} days
                </p>
              </div>
              <Image
                width={400}
                height={400}
                className="w-full"
                alt={plan.name}
                src={plansData[i].image}
              />
            </li>
          ))}
        <li className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-4">
              Custom plan for Enterprise level
            </p>
            <button className="px-[12px] py-[6px] rounded-md bg-slate-300">
              Contact Us
            </button>
          </div>
          <Image
            width={400}
            height={400}
            className="w-full"
            alt={plansData[3].title}
            src={plansData[3].image}
          />
        </li>
      </ul>
    </section>
  );
};

export default Plans;
