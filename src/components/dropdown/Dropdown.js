import React from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";

import DropdownArrow from "../dropdown-arrow/DropdownArrow";

const Dropdown = ({
  title,
  placeholder,
  options,
  font,
  fontStyle,
  fontSize,
  arrowColor,
  height,
  titleClassName,
  containerClassName,
  selectFieldPadding,
  dropdownListPadding,
  isSearchable,
  sf,
  value,
  onChange,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: height,
      minHeight: "34px",
      fontSize: fontSize ? fontSize : "13px",
      padding: selectFieldPadding ? selectFieldPadding : "0px 0px 0px 2px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      border: "1px solid #F0F0F1",
      fontFamily: font,
      fontStyle: fontStyle,
      backspaceRemovesValue: false,
      cursor: "pointer",
      boxShadow: "0px 10px 20px -12px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        borderColor: "none",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#AC9986",
    }),
    menu: provided => ({
      ...provided,
      borderRadius: "0px 0px 15px 15px",
      padding: dropdownListPadding ? dropdownListPadding : 0,
      marginTop: "-13px",
      borderBottom: "1px solid #F0F0F1",
      borderRight: "1px solid #F0F0F1",
      borderLeft: "1px solid #F0F0F1",
      boxShadow: "none",
    }),
    menuList: provided => ({
      ...provided,
      maxHeight: "230px",
      backgroundColor: "#fff",
      marginTop: "13px",
      borderRadius: "0px 0px 15px 15px",
      boxShadow: "0px 10px 20px -12px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#AC9986",
      fontFamily: font,
      fontStyle: fontStyle,
      fontSize: fontSize ? fontSize : "14px",
      cursor: "pointer",
      "&:first-of-type": {
        color: "#000",
        fontWeight: "bold",
      },
    }),
    indicatorSeparator: provided => ({
      ...provided,
      display: "none",
    }),
    placeholder: provided => ({
      ...provided,
      color: "#AC9986",
      fontWeight: 100,
    }),
  };

  const defaultTitleClasses = "field-labels-font mb-10px ml-10px text-black-gray";

  const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          {sf ? <div className="field-labels-font text-black-gray">SF</div> : <DropdownArrow color={arrowColor} />}
        </components.DropdownIndicator>
      )
    );
  };
  return (
    <div className={containerClassName}>
      <div className={titleClassName ? titleClassName : defaultTitleClasses}>{title}</div>
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
  title: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  font: PropTypes.string,
  fontStyle: PropTypes.string,
  arrowColor: PropTypes.string,
  height: PropTypes.string,
  titleClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  selectFieldPadding: PropTypes.string,
  dropdownListPadding: PropTypes.string,
  isSearchable: PropTypes.bool,
  sf: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
};

Dropdown.defaultProps = {
  title: "",
  placeholder: "",
  options: [{ label: "" }],
  font: "Late November",
  fontStyle: "normal",
  arrowColor: "",
  height: "45px",
  titleClassName: "",
  containerClassName: "",
  selectFieldPadding: "",
  dropdownListPadding: "",
  isSearchable: false,
  sf: false,
  value: { label: "" },
  onChange: () => {},
};

export default Dropdown;
