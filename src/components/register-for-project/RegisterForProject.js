import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStaticQuery, graphql } from "gatsby";

import Input from "../basic/input/Input";
import Button from "../basic/button/Button";

import { submitForm } from "../../utils/submitForm";

import "./RegisterForProject.css";

const RegisterForProject = ({ additionalFields }) => {
  const { hubspotForm } = useStaticQuery(graphql`
    query RegisterForProjectForm {
      hubspotForm(id: { eq: "d1efc93c-857c-4a3a-bab9-b4b9b26343d9" }) {
        guid
      }
    }
  `);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().email().required(),
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
    } else setShowError(false);
  }, [formik.errors, formik.touched]);

  return (
    <div className="register-for-project-wrapper py-32px px-25px lg:px-120px bg-light-purple rounded-100px">
      <h2 className="font-pangram font-normal text-36px text-deep-purple text-center mb-16px">
        Register For This Project
      </h2>
      <p className="text-mild-black text-16px font-normal text-center mb-30px">
        When you register for a project you’ll get access to all the news, information and updates about this project as
        its made available to us. You’l also receive available pricing and floor plans. <strong>Sign up below</strong>.
      </p>
      <form onSubmit={formik.handleSubmit} className="w-full justify-between flex items-end">
        <div className="flex space-x-40px">
          <Input
            id="firstName"
            name="firstName"
            placeholderColor="deep-purple"
            label="First Name"
            labelClasses="text-mild-black"
            placeholder="John"
            className="w-253px"
            borderRadius="rounded-100px"
            border=""
            height="h-52px"
            paddingLeft="px-16px"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            isShadow
          />
          <Input
            id="lastName"
            name="lastName"
            placeholderColor="deep-purple"
            labelClasses="text-mild-black"
            label="Last Name"
            placeholder="Smith"
            className="w-251px"
            borderRadius="rounded-100px"
            border=""
            height="h-52px"
            paddingLeft="px-16px"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            isShadow
          />
          <Input
            id="email"
            name="email"
            placeholderColor="deep-purple"
            label="Email Address"
            placeholder="johnsmith@email.com"
            labelClasses="text-mild-black"
            border=""
            className="w-350px"
            height="h-52px"
            paddingLeft="px-16px"
            borderRadius="rounded-100px"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isShadow
          />
        </div>
        <Button
          disabled={formik.isSubmitting || !formik.dirty || isSubmitted}
          onClick={formik.handleSubmit}
          variants="primary"
          btnClasses="w-110px rounded-200px h-52px"
        >
          <div className="font-medium text-16px">{isSubmitted ? "Submitted" : "Submit"}</div>
        </Button>
      </form>
      {showError && <div className="text-red-color-error-2 uppercase mt-16px text-center">{showError}</div>}
    </div>
  );
};

RegisterForProject.propTypes = {
  className: PropTypes.string,
  additionalFields: PropTypes.array,
};

RegisterForProject.defaultProps = {
  className: "",
  additionalFields: [],
};

export default RegisterForProject;
