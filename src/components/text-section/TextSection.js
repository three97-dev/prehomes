import React from "react";
import Markdown from "../basic/markdown/Markdown";

const TextSection = ({ content, className }) => {
  return (
    <div className={`text-black-gray -mb-24px ${className}`}>
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
