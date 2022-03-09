import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";

import UniversalLink from "../../utils/UniversalLink";

import "./LargeTile.css";

const LargeTile = ({ link, image, title, description }) => {
  return (
    <div className="px-13px lg:px-0px pb-15px">
      <div className="w-250px lg:w-349px filter drop-shadow-tile rounded-15px overflow-hidden mx-auto">
        <UniversalLink link={link}>
          <Image image={image} className="w-250px lg:w-349px h-218px lg:h-349px" />
          <div className="text-center p-20px bg-white">
            <h3 className="text-black mb-10px lg:mb-20px">{title}</h3>
            <p className="text-black-gray h-124px lg:h-104px w-210px lg:w-310px large-tile-text-cut">{description}</p>
          </div>
        </UniversalLink>
      </div>
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
