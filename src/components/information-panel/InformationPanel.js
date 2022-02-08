import React from "react";
import PropTypes from "prop-types";
import UniversalLink from "../../utils/UniversalLink";

const InformationPanel = ({ title, subTitle, buttonLink, className }) => {
  return (
    <div className={`w-full px-25px md+:px-20px lg:px-120px md:pt-94px mb-40px lg:mb-0px ${className}`}>
      <h2>{title}</h2>
      <h3 className="text-dark-creamy mt-50px mb-23px">{subTitle}</h3>
      <UniversalLink link={buttonLink}>
        <p className="break-words">{buttonLink}</p>
      </UniversalLink>
      <div className="hidden md+:block border-t border-gray-border mt-20px md:mt-37px"></div>
    </div>
  );
};

InformationPanel.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonLink: PropTypes.string,
  className: PropTypes.string,
};

InformationPanel.defaultProps = {
  title: "",
  subTitle: "",
  buttonLink: "",
  className: "",
};

export default InformationPanel;
