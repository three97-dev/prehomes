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
  labelClasses,
  borderRadius,
}) => {
  return (
    <div className={`${className}`}>
      {label ? (
        <div className={`grid grid-flow-col w-full`}>
          <label htmlFor={name} className={`justify-self-start sm+:ml-8px`}>
            <h2 className={`font-pangram text-12px text-white font-bold ${labelClasses}`}>{label}</h2>
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
        } font-pangram text-12px placeholder-${placeholderColor} ${height} w-full max-w-539px pr-20px ${paddingLeft} rounded-5px ${border} focus-visible:outline-none focus:outline-none ${borderRadius}`}
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
  placeholderColor: "text-mild-black",
  className: "",
  onBlur: () => {},
  onChange: () => {},
  disabled: false,
};

export default Input;
