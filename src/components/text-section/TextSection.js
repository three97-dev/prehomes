import React from "react";
import Markdown from "../basic/markdown/Markdown";

const TextSection = ({ content, className }) => {
  return (
    <div className={` bg-white-pink md:bg-transparent ${className}`}>
      <Markdown
        data={content}
        config={{
          p: "text-14px lg:text-16px leading-24px font-metropolis black-gray",
        }}
      />
    </div>
  );
};

export default TextSection;
