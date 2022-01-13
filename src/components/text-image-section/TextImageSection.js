import React from "react";

import TextSection from "../text-section/TextSection";
import Image from "../basic/image/Image";

import "./TextImageSection.css";

const TextImageSection = ({ content, image, textSectionStyle, className }) => {
  return (
    <div className={`md:text-image-section-grid md:px-25px lg:px-0px ${className}`}>
      <TextSection content={content} className={`pb-40px md:pb-0px px-25px md:px-0px ${textSectionStyle}`} />
      <div className="w-full flex justify-center">
        <Image image={image} className="mx-auto" />
      </div>
    </div>
  );
};

export default TextImageSection;
