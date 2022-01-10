import React from "react";
import RRenderer from "../basic/markdown/Markdown";

const PremiumAndPrestigeText = ({ title, textContent }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-peach-colour mb-70px w-full">
        <div className="min-w-370px mr-20px font-metropolis white-pink font-bold text-29px leading-29px pr-15px sm+:pr-0px">
          {title}
        </div>
        <div className="w-full lg:pl-104px">
          <hr className="mt-14px ml-auto" />
        </div>
      </div>
      <RRenderer
        data={textContent}
        config={{
          p: "font-metropolis font-normal text-16px leading-24px text-beige mb-50px",
        }}
      />
    </div>
  );
};

export default PremiumAndPrestigeText;
