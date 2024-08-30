"use client";
import { useGetSubscriptionPricesQuery } from "@/redux/features/plans/plan.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const {
    data: prices,
    isSuccess,
    isLoading,
  } = useGetSubscriptionPricesQuery(undefined);
  const { user, token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [userSubscriptions, setUserSubscriptions] = useState<string[]>([]);
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: { id: string; nickname: string }
  ) => {
    e.preventDefault();

    if (userSubscriptions.includes(price.id)) {
      router.push(`/profile`);
      return;
    }

    if (userSubscriptions.length === 0) {
      if (token) {
        setIsCreatingSubscription(true); // Start loading

        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/v1/subs/create-subscription",
            {
              priceId: price.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          window.open(data.url);
        } catch (error) {
          console.error("Error creating subscription:", error);
        } finally {
          setIsCreatingSubscription(false); // End loading
        }
      } else {
        router.push("/signup");
      }
    } else {
      toast.info("Already Subscribed. Please Upgrade Plan in Profile Page");
    }
  };

  useEffect(() => {
    const result =
      user?.subscriptions?.map((sub: any) => {
        if (!sub.cancel_at) return sub.plan.id;
      }) || [];
    setUserSubscriptions(result);
  }, [user]);

  useEffect(() => {
    if (user?.subscriptions?.some((sub: any) => sub.resumes_at)) {
      router.push("/profile");
    }
  }, [user, router]);

  const buttonText = () => (token ? "Buy the plan" : "Sign up");

  return (
    <section className="py-[60px] pb-[40px] container_main ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primaryTxt">
          Plans and Pricing
        </h2>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div> // Replace with your loading spinner or message
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isSuccess &&
            prices.map((price: any, i: number) => (
              <li
                key={price.id}
                className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in cursor-pointer"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-[10px]">
                    {price.nickname}
                  </h3>
                  <p className="text-gray-600 mb-3 ">
                    {plansData[i].description}
                  </p>
                  <h6 className="text-[24px] mb-3">
                    {(price.unit_amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                    <small className="text-slate-400">/mo</small>
                  </h6>

                  <p className="text-gray-600">
                    Download Limit:{" "}
                    {i === 0 ? "2" : i === 1 ? "50" : i === 2 ? "100" : ""}
                  </p>
                  <p className="text-gray-600 mb-6">Support: 24/7 days</p>

                  <button
                    onClick={(e) => handleClick(e, price)}
                    className={`w-full py-2 px-4 text-lg font-semibold rounded ${
                      price.nickname === "Basic"
                        ? "border border-red-600 text-red-600 hover:bg-red-100"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {userSubscriptions && userSubscriptions.includes(price.id)
                      ? "Access plan"
                      : buttonText()}
                  </button>
                </div>

                <Image
                  width={400}
                  height={400}
                  className="w-full mt-[30px]"
                  alt={plansData[i].title}
                  src={plansData[i].image}
                />
              </li>
            ))}
          {/* <li className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in">
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
          </li> */}
        </ul>
      )}
    </section>
  );
};

export default Plans;
