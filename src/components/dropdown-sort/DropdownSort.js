import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

import AlphaOrder from "../../assets/button/alpha-order.svg";

const Dropdown = ({
  placeholder,
  options,
  font,
  fontStyle,
  height,
  containerClassName,
  selectFieldPadding,
  dropdownListPadding,
  isSearchable,
  value,
  onChange,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: height,
      fontSize: "14px",
      padding: selectFieldPadding ? selectFieldPadding : "0px 0px 0px 32px",
      backgroundColor: "#8B8B8B",
      borderRadius: "15px",
      border: "1px solid #8B8B8B",
      fontFamily: font,
      fontStyle: fontStyle,
      fontWeight: "bold",
      backspaceRemovesValue: false,
      cursor: "pointer",
      boxShadow: undefined,
      "&:hover": {
        borderColor: "none",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,

      color: "#fff",
    }),
    menu: provided => ({
      ...provided,
      borderRadius: "0px 0px 15px 15px",
      padding: dropdownListPadding ? dropdownListPadding : 0,
      marginTop: "-13px",
      backgroundColor: "#8B8B8B",
      boxShadow: "none",
    }),
    menuList: provided => ({
      ...provided,
      maxHeight: "230px",
      backgroundColor: "#8B8B8B",
      marginTop: "13px",
      borderRadius: "0px 0px 15px 15px",
      boxShadow: "0px 18px 40px -12px rgba(0, 0, 0, 0.15)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#8B8B8B",
      color: "#fff",
      margin: "0 auto",
      textAlign: "center",
      fontFamily: font,
      fontStyle: fontStyle,
      fontSize: "14px",
      cursor: "pointer",
      fontWeight: "bold",
    }),
    indicatorSeparator: provided => ({
      ...provided,
      display: "none",
    }),
    placeholder: provided => ({
      ...provided,
      color: "#fff",
    }),
  };

  const DropdownIndicator = () => {
    return <img src={AlphaOrder} alt="alpha order" className="w-20px absolute left-15px " />;
  };

  return (
    <div className={containerClassName}>
      <Select
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        styles={customStyles}
        components={{ DropdownIndicator }}
        options={options}
        placeholder={placeholder ? placeholder : options[0].label}
      />
    </div>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array,
  font: PropTypes.string,
  fontStyle: PropTypes.string,
  height: PropTypes.string,
  titleClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  selectFieldPadding: PropTypes.string,
  dropdownListPadding: PropTypes.string,
  isSearchable: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  placeholder: "",
  options: [{ label: "" }],
  font: "Metropolis",
  height: "45px",
  titleClassName: "",
  containerClassName: "",
  selectFieldPadding: "",
  dropdownListPadding: "",
  isSearchable: false,
  value: { label: "" },
  onChange: () => {},
};

export default Dropdown;
