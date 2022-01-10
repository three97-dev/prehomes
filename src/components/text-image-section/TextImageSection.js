import React from "react";

import TextSection from "../text-section/TextSection";
import Image from "../basic/image/Image";

import "./TextImageSection.css";

const TextImageSection = ({ content, image, className }) => {
  return (
    <div className="md:text-image-section-grid md:px-25px lg:px-0px pb-50px md:pb-0px">
      <TextSection content={content} className="py-20px px-25px md:px-0px" />
      <div className="w-full flex justify-center">
        <Image image={image} className="mx-auto" />
      </div>
    </div>
  );
};

export default TextImageSection;
