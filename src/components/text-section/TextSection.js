import React from "react";
import Markdown from "../basic/markdown/Markdown";

const TextSection = ({ content, className }) => {
  return (
    <div className={` -mb-24px ${className}`}>
      <Markdown
        data={content}
        config={{
          p: "text-14px lg:text-16px leading-24px font-light font-poppins text-black-gray mb-24px",
        }}
      />
    </div>
  );
};

export default TextSection;
