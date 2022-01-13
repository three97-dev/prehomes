import React from "react";
import RRenderer from "../basic/markdown/Markdown";

const PremiumAndPrestigeText = ({ title, textContent, prestigePage }) => {
  return (
    <div className="w-full px-25px md:px-112px">
      <div className="flex justify-between text-peach-colour mb-40px w-full tracking-wide">
        <div className="min-w-370px md+:min-w-430px mr-20px font-poppins white-pink font-bold text-29px md+:text-32px leading-29px md+:leading-50px pr-15px sm+:pr-0px">
          {title}
        </div>
        <div className="w-full lg:pl-35px lg:pr-10px">
          <hr className="mt-15px md+:mt-25px ml-auto" />
        </div>
      </div>
      <RRenderer
        data={textContent}
        config={{
          p: `text-14px md+:text-16px leading-24px font-light font-poppins mb-50px md+:mb-33px ${
            prestigePage ? "text-white-pink" : "text-beige"
          }`,
        }}
      />
    </div>
  );
};

export default PremiumAndPrestigeText;
