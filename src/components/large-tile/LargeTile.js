import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";

import UniversalLink from "../../utils/UniversalLink";

import "./LargeTile.css";

const LargeTile = ({ link, image, title, description }) => {
  return (
    <div className="shadow-tile w-250px lg:w-349px filter drop-shadow-none mx-12px lg:px-0px my-50px lg:my-0px rounded-15px overflow-hidden">
      <UniversalLink link={link}>
        <Image image={image} className="h-215px lg:h-349px" />
        <div className="text-center p-20px bg-white">
          <h3 className="text-black mb-10px lg:mb-20px">{title}</h3>
          <p className="text-black-gray">{description}</p>
        </div>
      </UniversalLink>
    </div>
  );
};

LargeTile.propTypes = {
  link: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
};

LargeTile.defaultProps = {
  link: "",
  image: {},
  title: "",
  description: "",
};

export default LargeTile;
