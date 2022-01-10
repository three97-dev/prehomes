import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";

import "./InputPhone.css";

const InputPhone = ({ id, name, title, placeholder, value, onBlur, onChange, isError, height, className }) => {
  const inputBorderColors = {
    normal: isError ? "#F15D5E" : "#CBCCCE",
    hover: isError ? "#F15D5E" : "#6F8794",
  };
  return (
    <div className={`${className} phone-input`}>
      <PhoneInput
        inputProps={{
          id: id,
          name: name,
          title: title,
          onBlur: onBlur,
        }}
        country={"us"}
        onlyCountries={["us"]}
        onChange={onChange}
        value={value}
        disableCountryCode={true}
        disableDropdown={true}
        masks={{ us: "...-...-...." }}
        style={{
          "--height": height,
          "--border-color": inputBorderColors.normal,
          "--border-color-hover": inputBorderColors.hover,
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
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  height: PropTypes.string,
  className: PropTypes.string,
};

InputPhone.defaultProps = {
  id: "",
  name: "",
  title: "",
  placeholder: "",
  onBlur: () => {},
  onChange: () => {},
  isError: false,
  height: "55px",
  className: "",
};

export default InputPhone;
