import React from "react";
import RRenderer from "../basic/markdown/Markdown";

const PremiumAndPrestigeText = ({ title, textContent, prestigePage }) => {
  return (
    <div className="w-full px-25px md:px-112px">
      <div className="flex justify-between text-white-pink mb-40px w-full">
        <h2 className="min-w-360px md:min-w-440px mr-20px pr-15px sm+:pr-0px">{title}</h2>
        <div className="w-full lg:pl-35px lg:pr-10px">
          <hr className="mt-15px md:mt-17px ml-auto" />
        </div>
      </div>
      <div className={`mb-50px md+:mb-33px ${prestigePage ? "text-white-pink" : "text-beige"}`}>{textContent}</div>
    </div>
  );
};

export default PremiumAndPrestigeText;
