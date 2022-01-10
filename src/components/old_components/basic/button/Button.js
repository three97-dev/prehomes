import React from "react";
import PropTypes from "prop-types";

import "./Button.css";
import UniversalLink from "../../../../utils/UniversalLink";

const Button = ({ link, label, onClick, className, ...otherProps }) => {
  const sharedClasses =
    "typography-body px-20px py-17px text-center border border-coral-red h-55px rounded-28px inline-block button-shadow";
  const normalState = "bg-white text-coral-red";
  const hoverState = "hover:bg-coral-red hover:text-white";
  const keyboardFocusState = "focus-visible:bg-coral-red focus-visible:text-white";

  const buttonClasses = `${sharedClasses} ${normalState} ${hoverState} ${keyboardFocusState} ${className}`;

  if (link) {
    return (
      <UniversalLink link={link} className={buttonClasses} {...otherProps}>
        {label}
      </UniversalLink>
    );
  }

  return (
    <button type="button" onClick={onClick} className={buttonClasses} {...otherProps}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  label: "Button",
  onClick: () => {},
  className: "",
};

export default Button;
