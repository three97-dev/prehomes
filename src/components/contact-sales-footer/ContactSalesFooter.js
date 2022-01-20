import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

import Input from "../basic/input/Input";
import Button from "../basic/button/Button";

import { submitForm } from "../../utils/submitForm";

import "./ContactSalesFooter.css";

const ContactSalesFooter = ({
  projectName,
  isFormDisabled,
  floorPlanName,
  contactSalesIsOpen,
  className,
  onSubmit,
  onSubmitWithError,
}) => {
  const { hubspotForm } = useStaticQuery(graphql`
    query ContactSalesFooter {
      hubspotForm(id: { eq: "bf71af5f-a12c-44a2-ab3f-07dbb53c0915" }) {
        guid
      }
    }
  `);

  const { href } = useLocation();

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await submitForm(
          hubspotForm.guid,
          [
            {
              name: "name",
              value: values.name,
            },
            {
              name: "email",
              value: values.email,
            },
            {
              name: "project_name",
              value: projectName,
            },
            {
              name: "floor_plan_identified",
              value: floorPlanName,
            },
            {
              name: "page_url",
              value: href,
            },
          ],
          Date.now(),
          true
        );
        onSubmit();
      } catch (e) {
        onSubmitWithError();
        console.log(`Form is not submitted: ${e.message}`, e);
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.errors.name || formik.errors.email || !formik.values.name || !formik.values.email) {
      setIsError(true);
    } else setIsError(false);
  }, [formik.errors, formik.values]);

  useEffect(() => {
    if (isSubmitClicked && isError) {
      onSubmitWithError();
    }
  }, [isSubmitClicked]);

  useEffect(() => {
    return function cleanup() {
      setIsSubmitClicked(false);
    };
  });

  return (
    <div
      className={`${
        contactSalesIsOpen ? "block" : "hidden"
      } contact-sales-footer fixed left-0px bottom-0px w-full bg-white ${className}`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="contact-sales-footer-grid w-full h-75px mx-auto pl-20px pr-28px bg-white"
      >
        <h2 className="gridTitleArea text-tundora">Request Info</h2>
        <Input
          id="name"
          name="name"
          type="text"
          placeholderColor="placeholder-dark-orange"
          disabled={formik.isSubmitting || isFormDisabled}
          placeholder="Name"
          font="placeholder-font"
          className="gridNameArea"
          height="h-45px"
          border="border border-silver"
          paddingLeft="pl-23px"
          isShadow={false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <Input
          id="email"
          name="email"
          type="email"
          placeholderColor="placeholder-dark-orange"
          disabled={formik.isSubmitting || isFormDisabled}
          placeholder="Email Address"
          font="placeholder-font"
          className="gridEmailArea"
          height="h-45px"
          border="border border-silver"
          paddingLeft="pl-23px"
          isShadow={false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {isFormDisabled ? (
          <div className="gridButtonArea border border-black h-54px button-font text-dark-grey flex items-center justify-center rounded-15px cursor-not-allowed">
            Submitted
          </div>
        ) : (
          <Button
            variants="dark_orange"
            btnClasses="gridButtonArea h-54px"
            onClick={() => {
              setIsSubmitClicked(true);
              formik.handleSubmit();
            }}
          >
            <div className="button-font text-white">Submit</div>
          </Button>
        )}
      </form>
    </div>
  );
};

ContactSalesFooter.propTypes = {
  contactSalesIsOpen: PropTypes.bool,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onSubmitWithError: PropTypes.func,
};
ContactSalesFooter.defaultProps = {
  contactSalesIsOpen: true,
  className: "",
  onSubmit: () => {},
  onSubmitWithError: () => {},
};

export default ContactSalesFooter;
