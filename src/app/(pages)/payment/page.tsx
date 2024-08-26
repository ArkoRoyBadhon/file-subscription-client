"use client";

import CheckoutPage from "@/components/payments/CheckoutPage";
import { useAppSelector } from "@/redux/hook";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment() {
  const { planData } = useAppSelector((state) => state.plan);

  return (
    <main className="min-h-[60vh]">
      <div className="max-w-md mx-auto p-10 border m-10 rounded-md shadow-md">
        {planData?.price === 0 ? (
          <p className="w-full text-center text-btnColor">This Plan Already Has Been Expired</p>
        ) : (
          <>
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-2 text-center">
                Payment
              </h1>
              <h2 className="text-2xl text-center">
                Has requested
                <span className="font-bold"> ${planData?.price}</span>
              </h2>
              <h2 className="text-2xl text-center">
                For
                <span className="font-bold"> {planData?.name}</span>
              </h2>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutPage amount={planData?.price || 0} />
            </Elements>
          </>
        )}
      </div>
    </main>
  );
}
