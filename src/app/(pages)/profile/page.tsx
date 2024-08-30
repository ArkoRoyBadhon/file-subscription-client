"use client";
import { useAppSelector } from "@/redux/hook";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import { User2Icon } from "lucide-react";

const ProfilePage = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/subs/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSubscriptions(data);
      } catch (err) {
        setError("Failed to fetch subscriptions.");
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) getSubscriptions();
  }, [token]);

  const manageSubscriptions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/subs/customer-portal",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("manage", data.url);
      window.open(data.url);
    } catch (err) {
      console.error("Error managing subscriptions:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto p-4 overflow-y-auto">
      <div className="flex flex-col items-center">
        <User2Icon className="text-4xl mb-4" />
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-lg font-light mb-4">Subscription status</p>
      </div>

      <div className="space-y-4">
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub: any, i: number) => (
            <div key={i} className="border p-4 rounded-lg shadow-md">
              <hr className="my-4" />
              <h4 className="text-xl font-semibold">{sub.plan.nickname}</h4>
              <h5 className="text-lg font-medium">
                {(sub.plan.amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: sub.plan.currency,
                })}
              </h5>
              <p>Status: {sub.cancel_at && sub.status ? "Canceled" : "Active"}</p>
              <p>Card last 4 digits: {sub.default_payment_method.card.last4}</p>
              <p>
                Current period end:{" "}
                {moment(sub.current_period_end * 1000).format(
                  "dddd, MMMM Do YYYY h:mm:ss a"
                )}
              </p>
              <div className="flex space-x-2">
                {/* <button
                  onClick={() =>
                    router.push(`/${sub.plan.nickname.toLowerCase()}`)
                  }
                  className="bg-transparent border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Access/View Status
                </button> */}
                <button
                  onClick={manageSubscriptions}
                  className="bg-transparent border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No subscriptions found.</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
