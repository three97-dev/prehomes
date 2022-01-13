import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";

import "./InputPhone.css";

const InputPhone = ({
  id,
  name,
  title,
  label,
  labelСonfigure,
  placeholder,
  border,
  value,
  onBlur,
  onChange,
  placeholderColor,
  isError,
  isShadow,
  className,
}) => {
  const inputBorderColors = {
    normal: isError ? "red-color-error" : null,
  };
  return (
    <div className={`${className} input-phone`}>
      <div className={`grid grid-flow-col w-full`}>
        <label htmlFor={name} className={`justify-self-start typography-body-small text-3xl sm+:ml-20px`}>
          <div className={`font-rosario pb-8px ${labelСonfigure}`}>{label}</div>
        </label>
      </div>
      <PhoneInput
        inputProps={{
          id: id,
          name: name,
          title: title,
          onBlur: onBlur,
          className: `${
            isShadow ? "input-phone-shadow" : null
          } placeholder-tracking-wider typography-body-small text-12px leading-20px font-late-november text-dark-orange h-49px w-full max-w-539px pr-20px pl-15px sm+:pl-20px rounded-15px focus-visible:outline-none ${placeholderColor} ${border}`,
        }}
        country={"us"}
        onlyCountries={["us"]}
        onChange={onChange}
        value={value}
        disableCountryCode={true}
        disableDropdown={true}
        masks={{ us: "...-...-...." }}
        style={{
          "--border-color": inputBorderColors.normal,
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

InputPhone.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  labelСonfigure: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  className: PropTypes.string,
};

InputPhone.defaultProps = {
  id: "",
  name: "",
  title: "",
  label: "",
  labelСonfigure: "text-14px leading-14px",
  placeholder: "",
  placeholderColor: "",
  onBlur: () => {},
  onChange: () => {},
  isError: false,
  className: "",
};

export default InputPhone;
