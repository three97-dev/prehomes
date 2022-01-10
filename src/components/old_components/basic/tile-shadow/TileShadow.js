import React from "react";
import PropTypes from "prop-types";

import "./TileShadow.css";

const BG_COLORS = {
  type1: "bg-tile-bg-1",
  type2: "bg-tile-bg-2",
  type3: "bg-tile-bg-3",
  type4: "bg-tile-bg-4",
  type5: "bg-tile-bg-5",
  type6: "bg-tile-bg-6",
};

const resolveBgColor = color => {
  const resolvedCss = BG_COLORS[color];
  if (!resolvedCss) {
    throw new Error(`Failed to resolve background color for tile: ${color}`);
  }
  return resolvedCss;
};

const TileShadow = ({ children, color, spacing, className, hasContentBg, ...otherProps }) => {
  const bgMargins = spacing === "10px" ? "mt-10px -ml-10px" : "mt-20px -ml-20px";
  return (
    <div className={`relative w-max ${className}`} {...otherProps}>
      <div className={`absolute -z-10 w-full h-full ${bgMargins} ${resolveBgColor(color)}`}></div>
      <div className={`tile-shadow ${hasContentBg ? "bg-tile-content" : "bg-white"}`}>{children}</div>
    </div>
  );
};

TileShadow.propTypes = {
  color: PropTypes.string,
  spacing: PropTypes.string,
  className: PropTypes.string,
  hasContentBg: PropTypes.bool,
};

TileShadow.defaultProps = {
  color: "type1",
  spacing: "10px",
  className: "",
  hasContentBg: true,
};

export default TileShadow;
