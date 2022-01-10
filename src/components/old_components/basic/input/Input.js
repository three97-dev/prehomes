import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({ className, height, placeholder, isError, type, title, name, id, onChange, value, onBlur }) => {
  const inputError = isError
    ? "border-heading-red"
    : `border-input-color hover:border-tile-bg-4 focus-visible:border-tile-bg-4`;

  return (
    <div className={`${className}`}>
      <input
        id={id}
        type={type}
        name={name}
        title={title}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        className={`placeholder-input-color tracking-wider typography-body-small text-body text-tile-bg-4 border ${height} w-full pr-16px pl-25px md:pl-30px rounded-full focus-visible:outline-none
        ${inputError} `}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "",
  name: "",
  id: "",
  placeholder: "",
  isError: false,
  className: "",
  height: "h-55px",
  onBlur: () => {},
  onChange: () => {},
};

export default Input;
