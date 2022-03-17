import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

import Input from "../basic/input/Input";
import TextArea from "../basic/text-area/TextArea";
import InputPhone from "../basic/input-phone/InputPhone";
import Button from "../basic/button/Button";
import ModalWindowForContactRealtorForm from "../modal-window-for-contact-realtor-form/ModalWindowForContactRealtorForm";

import { submitForm } from "../../utils/submitForm";

import "./ContactRealtorFormSection.css";

const ContactRealtorFormSection = ({ additionalFields, className }) => {
  const { hubspotForm } = useStaticQuery(graphql`
    query ContactRealtorForm {
      hubspotForm(id: { eq: "bf71af5f-a12c-44a2-ab3f-07dbb53c0915" }) {
        guid
      }
    }
  `);

  const { href } = useLocation();

  const [isSubmitted, setIsSubmitted] = useState(false);
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
        const payload = [
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
        ];
        if (additionalFields) {
          payload.push(...additionalFields);
        }
        let data = await submitForm(hubspotForm.guid, payload, Date.now(), true);
        setIsSubmitted(true);
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
    <div
      className={`contact-container w-full justify-center px-10px md:px-120px bg-whitesmoke sm+:bg-light-gray ${className}`}
    >
      <div className="flex w-full max-w-1126px mx-auto justify-center py-30px">
        <div className="flex-1 flex justify-center items-center">
          <h2 className="text-47px text-white font-normal w-350px leading-61px">Maybe it’s time for a realtor.</h2>
        </div>
        <div className="form-wrapper contact-realtor-form-form-box-shadow">
          <form
            onSubmit={formik.handleSubmit}
            className="grid contact-realtor-form-grid-mobile sm+:contact-realtor-form-grid w-full"
          >
            <Input
              id="firstName"
              name="firstName"
              placeholderColor="text-mild-grey"
              label="First Name"
              placeholder="Ex: John"
              className="contact-realtor-form-first-name-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isShadow
            />
            <Input
              id="lastName"
              name="lastName"
              placeholderColor="text-mild-grey"
              label="Last Name"
              placeholder="Ex: Smith"
              className="contact-realtor-form-last-name-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isShadow
            />
            <Input
              id="email"
              name="email"
              placeholderColor="text-mild-grey"
              label="Email Address"
              placeholder="Ex: Johns@domain.com"
              className="w-full contact-realtor-form-email-area"
              border="border border-silver"
              height="h-49px"
              paddingLeft="pl-15px sm+:pl-20px"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isShadow
            />
            <InputPhone
              id="phone"
              name="phone"
              placeholderColor="text-mild-grey"
              label="Phone Number"
              placeholder="Ex: 123-456-7890"
              className="w-full contact-realtor-form-phone-area"
              border="border border-silver"
              height="h-49px"
              onChange={(value, country, e, formattedValue) => {
                formik.setFieldValue("phone", formattedValue);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              isShadow
            />
            <TextArea
              id="message"
              name="message"
              placeholderColor="text-mild-grey"
              label="How can we help?"
              placeholder="Ex: I need help finding a new build home"
              className="contact-realtor-form-information-area"
              border="border border-silver"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              isShadow
            />
            <div className="contact-realtor-form-message-area text-red-color-error-2 uppercase footer-font self-center ml-auto sm+:ml-0px my-15px">
              {showError}
            </div>
            <Button
              disabled={formik.isSubmitting || !formik.dirty || isSubmitted}
              onClick={formik.handleSubmit}
              variants="outline"
              btnClasses="contact-realtor-form-button-area w-full max-w-173px md:max-w-250px h-54px ml-auto contact-realtor-form-button-shadow mt-20px"
            >
              <div className="button-font">{isSubmitted ? "Submitted" : "Submit"}</div>
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
