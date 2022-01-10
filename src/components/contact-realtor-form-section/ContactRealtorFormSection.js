import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStaticQuery, graphql } from "gatsby";

import Input from "../basic/input/Input";
import TextArea from "../basic/text-area/TextArea";
import InputPhone from "../basic/input-phone/InputPhone";
import Button from "../basic/button/Button";
import ModalWindowForContactRealtorForm from "../modal-window-for-contact-realtor-form/ModalWindowForContactRealtorForm";

import { submitForm } from "../../utils/submitForm";

import "./ContactRealtorFormSection.css";

const ContactRealtorFormSection = ({ onSubmit, className }) => {
  const { hubspotForm, contentfulContactRealtorForm } = useStaticQuery(graphql`
    query ContactRealtorForm {
      hubspotForm(id: { eq: "bf71af5f-a12c-44a2-ab3f-07dbb53c0915" }) {
        guid
      }
      contentfulContactRealtorForm(contentful_id: { eq: "1ufUCRC43cbZeNrF9POjb8" }) {
        title
        content
        firstNameInputLabel
        firstNameInputPlaceholder
        lastNameInputLabel
        lastNameInputPlaceholder
        emailAddressInputLabel
        emailAddressInputPlaceholder
        phoneNumberInputLabel
        phoneNumberInputPlaceholder
        textareaInputLabel
        textareaInputPlaceholder
        buttonLabel
      }
    }
  `);

  const {
    title,
    content,
    firstNameInputLabel,
    firstNameInputPlaceholder,
    lastNameInputLabel,
    lastNameInputPlaceholder,
    emailAddressInputLabel,
    emailAddressInputPlaceholder,
    phoneNumberInputLabel,
    phoneNumberInputPlaceholder,
    textareaInputLabel,
    textareaInputPlaceholder,
    buttonLabel,
  } = contentfulContactRealtorForm;

  const [showError, setShowError] = useState(null);

  const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().matches(phoneRegExp, "Phone Number should match XXX-XXX-XXXX").required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let data = await submitForm(
          hubspotForm.guid,
          [
            {
              name: "firstName",
              value: values.firstName,
            },
            {
              name: "lastName",
              value: values.lastName,
            },
            {
              name: "email",
              value: values.email,
            },
            {
              name: "phone",
              value: values.phone,
            },
            {
              name: "message",
              value: values.message,
            },
          ],
          Date.now(),
          true
        );
        onSubmit();
      } catch (e) {
        console.log(`Form is not submitted: ${e.message}`, e);
        setShowError(e.message);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.errors.firstName && formik.touched.firstName) {
      setShowError(formik.errors.firstName);
    } else if (formik.errors.lastName && formik.touched.lastName) {
      setShowError(formik.errors.lastName);
    } else if (formik.errors.email && formik.touched.email) {
      setShowError(formik.errors.email);
    } else if (formik.errors.phone && formik.touched.phone) {
      setShowError(formik.errors.phone);
    } else if (formik.errors.message && formik.touched.message) {
      setShowError(formik.errors.message);
    } else setShowError(false);
  }, [formik.errors, formik.touched]);

  return (
    <div className={`w-full justify-center px-10px md:px-120px bg-whitesmoke ${className}`}>
      <div className="w-full max-w-1126px mx-auto justify-center py-10px md:pt-73px md:pb-75px">
        <div className="bg-white pt-55px pb-22px sm+:pb-45px px-17px md:px-50px lg:px-100px rounded-15px contact-realtor-form-form-box-shadow">
          <div className="text-center mb-15px sm+:mb-13px text-22px sm+:text-29px leading-30px tracking-wide font-bold font-metropolis text-tundora ml-10px">
            {title}
          </div>
          <div className="text-center text-14px sm+:text-16px leading-24px font-metropolis text-black-gray pl-4px sm+:pl-3px mx-20px sm+:px-0px">
            {content}
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="grid contact-realtor-form-grid-mobile sm+:contact-realtor-form-grid w-full mt-20px sm+:mt-18px"
          >
            <Input
              id="firstName"
              name="firstName"
              placeholderColor="placeholder-dark-orange font-metropolis text-14px leading-14px"
              labelСonfigure="text-tundora font-bold font-metropolis text-11px sm+:text-10px leading-10px"
              label={firstNameInputLabel}
              placeholder={firstNameInputPlaceholder}
              className="contact-realtor-form-first-name-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            <Input
              id="lastName"
              name="lastName"
              placeholderColor="placeholder-dark-orange font-metropolis text-14px leading-14px"
              labelСonfigure="text-tundora font-bold font-metropolis text-11px sm+:text-10px leading-10px"
              label={lastNameInputLabel}
              placeholder={lastNameInputPlaceholder}
              className="contact-realtor-form-last-name-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            <Input
              id="email"
              name="email"
              placeholderColor="placeholder-dark-orange font-metropolis text-14px leading-14px pr-5px"
              labelСonfigure="text-tundora font-bold font-metropolis text-11px sm+:text-10px leading-10px"
              label={emailAddressInputLabel}
              placeholder={emailAddressInputPlaceholder}
              className="contact-realtor-form-email-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <InputPhone
              id="phone"
              name="phone"
              placeholderColor="placeholder-dark-orange font-metropolis text-14px leading-14px"
              labelСonfigure="text-tundora font-bold font-metropolis text-11px sm+:text-10px leading-10px"
              label={phoneNumberInputLabel}
              placeholder={phoneNumberInputPlaceholder}
              className="contact-realtor-form-phone-area"
              border="border border-silver"
              height="h-49px"
              onChange={(value, country, e, formattedValue) => {
                formik.setFieldValue("phone", formattedValue);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <TextArea
              id="message"
              name="message"
              placeholderColor="placeholder-dark-orange font-metropolis text-14px leading-14px"
              labelСonfigure="text-tundora font-bold font-metropolis text-11px sm+:text-10px leading-10px"
              label={textareaInputLabel}
              placeholder={textareaInputPlaceholder}
              className="contact-realtor-form-information-area"
              border="border border-silver"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            <div className="contact-realtor-form-message-area text-red-color-error-2 font-bold uppercase font-metropolis text-14px leading-14px self-center ml-auto sm+:ml-0px my-15px">
              {showError}
            </div>
            <Button
              disabled={formik.isSubmitting || !formik.dirty}
              onClick={formik.handleSubmit}
              variants="dark_orange"
              btnClasses="contact-realtor-form-button-area bg-dark-orange text-white w-full max-w-173px md:max-w-250px h-54px ml-auto contact-realtor-form-button-shadow"
            >
              <div className="text-16px leading-16px text-white font-metropolis font-bold">{buttonLabel}</div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactRealtorForm = ({ className }) => {
  const [isSubmittedContactRealtor, setIsSubmittedContactRealtor] = useState(false);

  const closeModal = useCallback(() => {
    setIsSubmittedContactRealtor(false);
  }, [setIsSubmittedContactRealtor]);

  return (
    <>
      <ContactRealtorForm
        onSubmit={() => {
          setIsSubmittedContactRealtor(true);
        }}
        className={className}
      />
      <ModalWindowForContactRealtorForm modalIsOpen={isSubmittedContactRealtor ? true : false} onClose={closeModal} />
    </>
  );
};

ContactRealtorFormSection.propTypes = {
  className: PropTypes.string,
};

ContactRealtorFormSection.defaultProps = {
  className: "",
};

export default ContactRealtorFormSection;
