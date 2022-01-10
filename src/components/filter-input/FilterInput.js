import React from "react";
import PropTypes from "prop-types";

import "./FilterInput.css"

const FilterInput = ({ title, value, placeholder, onChange, className, inputClassName, titleClassName }) => {
  const defaultTitleClasses = "font-metropolis text-tundora text-14px leading-14px font-bold mb-10px ml-10px";

  return (
    <div className={`relative ${className}`}>
      <div className={titleClassName ? titleClassName : defaultTitleClasses}>{title}</div>
      <input
        type="number"
        min={1}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`search-input w-full h-45px pl-12px pr-35px rounded-15px border border-silver outline-none font-metropolis text-14px text-dark-orange placeholder-dark-orange ${inputClassName}`}
      />
      <div className="absolute right-10px bottom-15px font-metropolis font-bold text-14px leading-14px text-black">
        SF
      </div>
    </div>
  );
};

FilterInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

FilterInput.defaultProps = {
  title: "",
  value: "",
  placeholder: "",
  onChange: () => {},
  className: "",
};

export default FilterInput;
