import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import UniversalLink from "../../../utils/UniversalLink";

import "./Button.css";

const BUTTONS = {
  black_gradient: "buttonBlackGradient boxShadow",
  beige_gradient: "buttonBeigeGradient boxShadow",
  dark_orange: "buttonDarkOrange",
};

const resolveButton = variants => {
  const resolvedCss = BUTTONS[variants];
  if (!resolvedCss) {
    throw new Error(`Failed to resolve variant: ${variants}`);
  }
  return resolvedCss;
};

const Button = ({ children, btnClasses, link, onClick, variants, type }) => {
  const buttonClasses = classNames(
    btnClasses,
    resolveButton(variants),
    "focus-visible:outline-none focus:outline-none"
  );

  if (link) {
    return (
      <UniversalLink link={link}>
        <div className={buttonClasses}>{children}</div>
      </UniversalLink>
    );
  }

  return (
    <button type={type ? type : "button"} onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  link: PropTypes.string,
  variants: PropTypes.oneOf(["black_gradient", "beige_gradient", "dark_orange"]),
  btnClasses: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  btnClasses: "",
};

export default Button;
