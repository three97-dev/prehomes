import React from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";

import UniversalLink from "../../utils/UniversalLink";

const LargeTile = ({ link, image, title, description }) => {
  return (
    <div className="w-250px lg:w-349px h-416px lg:h-524px filter drop-shadow-tile mx-12px lg:px-0px my-50px lg:my-0px bg-peach-colour rounded-15px overflow-hidden">
      <UniversalLink link={link}>
        <Image image={image} className="h-218px lg:h-349px" />
        <div className="text-center p-20px">
          <div className="text-18px lg:text-22px leading-18px lg:leading-22px text-black font-metropolis font-bold lg:font-normal mb-20px">
            {title}
          </div>
          <div className="text-14px lg:text-16px leading-24px font-metropolis text-black-gray">{description}</div>
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
