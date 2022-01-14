import React from "react";
import PropTypes from "prop-types";

import Input from "../basic/input/Input";
import InputPhone from "../basic/input-phone/InputPhone";
import Button from "../basic/button/Button";
import Dropdown from "../dropdown/Dropdown";

import "./FormWithSelects.css";

const FormWithSelects = ({
  title,
  content,
  firstNameInputLabel,
  firstNameInputPlaceholder,
  lastNameInputLabel,
  lastNameInputPlaceholder,
  emailInputLabel,
  emailInputPlaceholder,
  phoneInputLabel,
  phoneInputPlaceholder,
  dropdownRealtorLabel,
  dropdownRealtorPlaceholder,
  dropdownRealtorOptions,
  dropdownPurchaseLabel,
  dropdownPurchasePlaceholder,
  dropdownPurchaseOptions,
  dropdowHearAboutUsLabel,
  dropdownHearAboutUsPlaceholder,
  dropdowHearAboutUsOptions,
  buttonLabel,
  className,
}) => {
  return (
    <div className={`grid justify-items-center w-full px-120px bg-white-pink ${className}`}>
      <div className="grid justify-items-center w-full max-w-1122px pt-66px pb-40px">
        <div className="text-center pb-17px text-29px leading-30px font-bold font-metropolis text-black">{title}</div>
        <div className="border-t w-full mb-20px border-gray max-w-728px" />
        <div className="text-center text-16px leading-19px font-rosario text-dark-orange">{content}</div>
        <form className="grid form-with-selects-grid w-full mt-70px gap-y-24px">
          <Input
            placeholderColor="placeholder-dark-orange"
            labelСonfigure="text-black text-14px leading-14px"
            label={firstNameInputLabel}
            placeholder={firstNameInputPlaceholder}
            className="form-with-selects-first-name-input-area"
          />
          <Input
            placeholderColor="placeholder-dark-orange"
            labelСonfigure="text-black text-14px leading-14px"
            label={lastNameInputLabel}
            placeholder={lastNameInputPlaceholder}
            className="form-with-selects-last-name-input-area"
          />
          <Input
            placeholderColor="placeholder-dark-orange"
            labelСonfigure="text-black text-14px leading-14px"
            label={emailInputLabel}
            placeholder={emailInputPlaceholder}
            className="form-with-selects-email-input-area"
          />
          <InputPhone
            placeholderColor="placeholder-dark-orange"
            labelСonfigure="text-black text-14px leading-14px"
            label={phoneInputLabel}
            placeholder={phoneInputPlaceholder}
            className="form-with-selects-phone-input-area"
          />
          <Dropdown
            title={dropdownRealtorLabel}
            options={dropdownRealtorOptions}
            placeholder={dropdownRealtorPlaceholder}
            font="Rosario"
            fontStyle="italic"
            arrowColor="#AC9986"
            height="53px"
            containerClassName="form-with-selects-realtor-dropdown-area"
            selectFieldPadding="0px 12px 0px 20px"
            dropdownListPadding="0px 20px 0px 20px"
            titleClassName="ml-24px mb-22px"
          />
          <Dropdown
            title={dropdownPurchaseLabel}
            options={dropdownPurchaseOptions}
            placeholder={dropdownPurchasePlaceholder}
            font="Rosario"
            fontStyle="italic"
            arrowColor="#AC9986"
            height="53px"
            containerClassName="form-with-selects-purchase-dropdown-area"
            selectFieldPadding="0px 12px 0px 20px"
            dropdownListPadding="0px 20px 0px 20px"
            titleClassName="ml-24px mb-22px"
          />
          <Dropdown
            title={dropdowHearAboutUsLabel}
            options={dropdowHearAboutUsOptions}
            placeholder={dropdownHearAboutUsPlaceholder}
            font="Rosario"
            fontStyle="italic"
            arrowColor="#AC9986"
            height="53px"
            containerClassName="form-with-selects-hear-about-us-dropdown-area"
            selectFieldPadding="0px 12px 0px 20px"
            dropdownListPadding="0px 20px 0px 20px"
            titleClassName="ml-24px mb-22px"
          />
          <Button
            variants="black_gradient"
            btnClasses="form-with-selects-first-button-area text-white w-147px h-54px ml-auto pr-5px mt-30px"
          >
            <div className="button-font">{buttonLabel}</div>
          </Button>
        </form>
      </div>
    </div>
  );
};

FormWithSelects.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  firstNameInputLabel: PropTypes.string,
  firstNameInputPlaceholder: PropTypes.string,
  lastNameInputLabel: PropTypes.string,
  lastNameInputPlaceholder: PropTypes.string,
  emailInputLabel: PropTypes.string,
  emailInputPlaceholder: PropTypes.string,
  phoneInputLabel: PropTypes.string,
  phoneInputPlaceholder: PropTypes.string,
  dropdownRealtorLabel: PropTypes.string,
  dropdownRealtorPlaceholder: PropTypes.string,
  dropdownRealtorOptions: PropTypes.array,
  dropdownPurchaseLabel: PropTypes.string,
  dropdownPurchasePlaceholder: PropTypes.string,
  dropdownPurchaseOptions: PropTypes.array,
  dropdowHearAboutUsLabel: PropTypes.string,
  dropdownHearAboutUsPlaceholder: PropTypes.string,
  dropdowHearAboutUsOptions: PropTypes.array,
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
};

FormWithSelects.defaultProps = {
  title: "",
  content: "",
  firstNameInputLabel: "",
  firstNameInputPlaceholder: "",
  lastNameInputLabel: "",
  lastNameInputPlaceholder: "",
  emailInputLabel: "",
  emailInputPlaceholder: "",
  phoneInputLabel: "",
  phoneInputPlaceholder: "",
  dropdownRealtorLabel: "",
  dropdownRealtorPlaceholder: "",
  dropdownRealtorOptions: [{ label: "" }],
  dropdownPurchaseLabel: "",
  dropdownPurchasePlaceholder: "",
  dropdownPurchaseOptions: [{ label: "" }],
  dropdowHearAboutUsLabel: "",
  dropdownHearAboutUsPlaceholder: "",
  dropdowHearAboutUsOptions: [{ label: "" }],
  buttonLabel: "",
  className: "",
};

export default FormWithSelects;
