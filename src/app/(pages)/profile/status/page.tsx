'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/redux/hook";

const PackageStatus = () => {
  const [status, setStatus] = useState<{
    packageId: string;
    packageName: string;
    freeDownloadCount: number;
    paidDownloadCount: number;
    remainingDownloadCount: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {token} = useAppSelector(state => state.auth)
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionName, setSubscriptionName] = useState<any>();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/status", {
          params: {
            priceId: subscriptions,
            name: subscriptionName
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          
        // console.log("ddddd",response.data.data); 
        setStatus(response.data.data); 
      } catch (err) {
        // console.log("ddddd error", err); 
        setError("Failed to fetch package status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [subscriptionName, subscriptions]);


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

        
        setSubscriptions(data[0].plan.id);
        // setSubscriptions(data.data[0].plan.id);
        setSubscriptionName(data[0].plan.nickname);
        console.log("subscription ppp", data.data[0]);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) getSubscriptions();
  }, [token]);

  if (!status) {
    return <div>No status available</div>;
  }

  console.log("price id", subscriptions);
  console.log("price name", subscriptionName);
  
  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Package Status</h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Package Name:</span>
          <span>{status && status?.packageName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Free Download Count:</span>
          <span>{status.freeDownloadCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Paid Download Count:</span>
          <span>{status.paidDownloadCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">
            Remaining Download Count:
          </span>
          <span>{status.remainingDownloadCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PackageStatus;
