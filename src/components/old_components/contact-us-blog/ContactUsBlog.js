import React from "react";
import PropTypes from "prop-types";

import Text from "../basic/text/Text";
import Button from "../basic/button/Button";

import ImageBackgroundTablet from "../../../assets/old_assets/pages/blog/blog-contact-bg-tablet.svg";
import ImageBackgroundWeb from "../../../assets/old_assets/pages/blog/blog-contact-bg-web.svg";
import ImageBackgroundWebHd from "../../../assets/old_assets/pages/blog/blog-contact-bg-webhd.svg";

const ContactUsBlog = ({ title, link, subtitle, linkLabel, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-y-hidden ${className}`} {...otherProps}>
      <div className="grid relative justify-items-center py-50px md:py-100px lg:py-123px xl:py-152px w-318px md:w-328px lg:w-536px">
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block lg:hidden absolute -z-10 md:-bottom-110px md:-right-236px max-w-none"
        />
        <img
          src={ImageBackgroundWeb}
          alt="background"
          className="hidden lg:block xl:hidden absolute -z-10 lg:-bottom-83px lg:-right-377px max-w-none"
        />
        <img
          src={ImageBackgroundWebHd}
          alt="background"
          className="hidden xl:block absolute -z-10 xl:-bottom-112px xl:-right-650px max-w-none"
        />
        <Text typography="h2" className="mb-20px">
          {title}
        </Text>
        <Text typography="body" className="text-center px-1px md:px-0px">
          {subtitle}
        </Text>

        <Button label={linkLabel} link={link} className="mt-30px md:mt-50px lg:mt-48px w-full" />
      </div>
    </div>
  );
};

ContactUsBlog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkLabel: PropTypes.string,
  className: PropTypes.string,
  link: PropTypes.string,
};

ContactUsBlog.defaultProps = {
  title: "some title",
  subtitle: "some subtitle",
  linkLabel: "some linkLabel",
  link: "/",
  className: "",
};

export default ContactUsBlog;
