import { First, Forth, Second, Third } from "@/icons/featuresIcon";
import { features } from "@/mocks/features";
import { Feather } from "lucide-react";

const Features = () => {
  return (
    <>
      <div className="text-center pt-20">
        <h1 className="text-5xl font-bold text-primaryTxt">Why people choose us?</h1>
      </div>
      <div className="py-20 container_main grid grid-cols-4 gap-5 text-primaryTxt">
        {features.map(({ title, description }, idx: number) => (
          <div key={idx} className="flex flex-col gap-3">
            {idx === 0 && <First />}
            {idx === 1 && <Second />}
            {idx === 2 && <Third />}
            {idx === 3 && <Forth />}
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
