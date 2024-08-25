"use client"
import { useGetSubscriptionPlanQuery } from '@/redux/features/plans/auth.api';
import Image from 'next/image';
import React from 'react';

const plansData = [
  {
    id: 1,
    title: 'Basic',
    description: 'A basic plan for personal use.',
    image: '/images/enterprise-illustration-simple-a3523bf30d5359d8d384.svg',
    link: '/pricing/basic',
  },
  {
    id: 2,
    title: 'Standard',
    description: 'Standard plan for small teams.',
    image: '/images/individuals-illustration-simple-f78b478fea8155aa3396.svg',
    link: '/pricing/standard',
  },
  {
    id: 3,
    title: 'Pro',
    description: 'Pro plan for large teams.',
    image: '/images/students-illustration-simple-bad2bf8f57436dc5fa8b.svg',
    link: '/pricing/pro',
  },
  {
    id: 4,
    title: 'Enterprise',
    description: 'Custom solutions for large organizations.',
    image: '/images/teams-illustration-simple-49edde86a6b1a64cf647.svg',
    link: '/pricing/enterprise',
  },
];

const Plans = () => {

  const {data, isSuccess} = useGetSubscriptionPlanQuery(undefined)

  console.log("plans", data);
  
  return (
    <section className="py-[60px] pb-[40px] container_main">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primaryTxt">Plans and Pricing</h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isSuccess && data?.data.map((plan:any, i:number) => (
          <li key={plan.id} className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plansData[i].description}</p>
              <p className="text-gray-600 text-[14px]">Limit: {plan.limit}</p>
              <p className="text-gray-600 text-[14px]">Expires in Days: {plan.expire}</p>
    
            </div>
            <Image width={400} height={400} className="w-full" alt={plan.name} src={plansData[i].image} />
          </li>
        ))}
        <li className="border text-primaryTxt rounded-lg shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all ease-in">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">Custom plan for Enterprise level</p>
              <button className="px-[12px] py-[6px] rounded-md bg-slate-300">Contact Us</button>
    
            </div>
            <Image width={400} height={400} className="w-full" alt={plansData[3].title} src={plansData[3].image} />
          </li>
      </ul>
    </section>
  );
};

export default Plans;
