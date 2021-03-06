import React from "react";
import Markdown from "../basic/markdown/Markdown";

const TextSection = ({ title, content, className }) => {
  return (
    <div className={`text-black-gray ${className}`}>
      <h2 className={title ? "mt-30px mb-20px lg:mb-40px" : ""}>{title}</h2>
      <Markdown
        data={content}
        config={{
          p: "text-mild-black text-16px font-normal",
        }}
      />
    </div>
  );
};

export default TextSection;
