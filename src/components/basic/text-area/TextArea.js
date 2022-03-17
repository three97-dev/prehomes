import React from "react";
import PropTypes from "prop-types";

import "./TextArea.css";

const TextArea = ({
  placeholder,
  placeholderColor,
  border,
  type,
  title,
  name,
  label,
  id,
  onChange,
  onBlur,
  value,
  isShadow,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <div className={`grid grid-flow-col pb-8px w-full`}>
        <label htmlFor={name} className={`justify-self-start sm+:ml-8px`}>
          <div className="text-white text-12px font-pangram font-bold">{label}</div>
        </label>
      </div>
      <textarea
        id={id}
        type={type}
        name={name}
        title={title}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`${
          isShadow ? "text-area-shadow" : null
        } pangram-font text-12px resize-none text-dark-orange h-100px w-full pr-20px py-14px pl-15px rounded-15px focus-visible:outline-none ${placeholderColor} ${border}`}
      />
    </div>
  );
};

TextArea.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  type: "",
  name: "",
  id: "",
  label: "",
  placeholder: "",
  placeholderColor: "",
  className: "",
  onBlur: () => {},
  onChange: () => {},
};

export default TextArea;
