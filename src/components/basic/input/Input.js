import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({
  placeholder,
  placeholderColor,
  type,
  title,
  name,
  label,
  height,
  border,
  paddingLeft,
  id,
  onChange,
  onBlur,
  value,
  isShadow,
  className,
  disabled,
}) => {
  return (
    <div className={`${className}`}>
      {label ? (
        <div className={`grid grid-flow-col w-full`}>
          <label htmlFor={name} className={`justify-self-start sm+:ml-19px`}>
            <h2 className="field-labels-font text-black-gray pb-8px">{label}</h2>
          </label>
        </div>
      ) : null}
      <input
        id={id}
        type={type}
        name={name}
        title={title}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`${
          isShadow ? "input-shadow" : null
        } placeholder-font text-dark-orange ${height} w-full max-w-539px pr-20px ${paddingLeft} rounded-15px ${border} focus-visible:outline-none focus:outline-none ${placeholderColor}`}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  paddingLeft: PropTypes.string,
  placeholderColor: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  type: "",
  name: "",
  border: "",
  height: "h-53px",
  paddingLeft: "pl-27px",
  id: "",
  label: "",
  placeholder: "",
  placeholderColor: "",
  className: "",
  onBlur: () => {},
  onChange: () => {},
  disabled: false,
};

export default Input;
