import { QuoteIcon } from "lucide-react";
import React from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Your site saves me hundreds of hours of work and the inspiration through the newsletters is priceless!",
    name: "Maria Haynes",
    title: "Graphic Designer, Hayland Freelance Design",
  },
  {
    id: 2,
    quote:
      "I can download jaw-dropping video animations and motion graphics which I couldn’t make myself. The fact that all of these are highly editable saves days of time.",
    name: "Daniel",
    title: "Videographer",
  },
  {
    id: 3,
    quote:
      "I have used Envato Elements for years and I simply couldn’t do my job without it. The dashboard is easy to navigate, the assets are beautiful, bright, and innovative and the content never stops evolving.",
    name: "Frederica McCauley",
    title: "Communications Manager, Freshmark",
  },
];

const Creator = () => {
  return (
    <section className="container_main mx-auto pt-[80px] pb-[60px]">
      <h2 className="text-3xl font-bold text-center mb-8 text-primaryTxt">
        Join over 500,000 creators worldwide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              <QuoteIcon className="text-purple-500 w-8 h-8" />
            </div>
              <p className="text-lg mb-4">{testimonial.quote}</p>
            <div className="">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Creator;
