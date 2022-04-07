import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import "./PropertyType.css";

const PropertyType = () => {
  return (
    <div className="h-146px w-157px property-type-item border border-minty-green flex flex-col justify-center items-center rounded-5px">
      <StaticImage src="../../assets/property-type/property-type.svg" />
      <h4 className="font-light text-14px md:text-16px text-white pt-16px md:pt-24px mx-40px md:mx-32px">
        Detached <br />
        house
      </h4>
    </div>
  );
};

export default PropertyType;
