import React from "react";
import PropTypes from "prop-types";

const BORDER_SIDES = {
  right: "border-r",
  left: "border-l",
  top: "border-t",
  bottom: "border-b",
};

const resolveBorder = borderSide => {
  return BORDER_SIDES[borderSide];
};

const Border = ({ className, borderSide, ...otherProps }) => {
  return (
    <div className={`${className} absolute -z-10 w-full h-full`} {...otherProps}>
      <div className={`${resolveBorder(borderSide)} border-line-color2 w-full h-full`} />
    </div>
  );
};

Border.propTypes = {
  className: PropTypes.string,
  borderSide: PropTypes.oneOf(["right", "left", "top", "bottom"]),
};

Border.defaultProps = {
  className: "",
  borderSide: "right",
};

export default Border;
