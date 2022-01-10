import React from "react";
import PropTypes from "prop-types";

import "./Input.css";

const Input = ({
  placeholder,
  placeholderColor,
  labelСonfigure,
  type,
  title,
  name,
  label,
  font,
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
          <label htmlFor={name} className={`justify-self-start typography-body-small sm+:ml-19px`}>
            <div className={`font-rosario pb-8px ${labelСonfigure}`}>{label}</div>
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
        } placeholder-tracking-wider typography-body-small ${font} font-rosario italic text-dark-orange ${height} w-full max-w-539px pr-20px ${paddingLeft} rounded-15px ${border} focus-visible:outline-none ${placeholderColor}`}
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
  labelСonfigure: PropTypes.string,
  font: PropTypes.string,
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
  font: "text-14px leading-20px",
  height: "h-53px",
  paddingLeft: "pl-27px",
  id: "",
  label: "",
  placeholder: "",
  placeholderColor: "",
  labelСonfigure: "text-14px leading-14px",
  className: "",
  onBlur: () => {},
  onChange: () => {},
  disabled: false,
};

export default Input;
