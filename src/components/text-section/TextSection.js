import React from "react";
import Markdown from "../basic/markdown/Markdown";

const TextSection = ({ title, content, className }) => {
  return (
    <div className={`text-black-gray -mb-24px ${className}`}>
      <h2 className={title ? "mb-40px" : ""}>{title}</h2>
      <Markdown
        data={content}
        config={{
          p: "mb-24px",
        }}
      />
    </div>
  );
};

export default TextSection;
