import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import Text from "../basic/text/Text";

import ImageBackgroundMobile from "../../../assets/old_assets/pages/blog/blog-post-bg-mobile.svg";
import ImageBackgroundTablet from "../../../assets/old_assets/pages/blog/blog-post-bg-tablet.svg";

const BlogPostContent = ({ text, minutesToRead, minutesToReadText, date, className, ...otherProps }) => {
  let dt = DateTime.now();
  let dateToday = dt.setLocale("en").toLocaleString(DateTime.DATE_HUGE);

  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative px-36px md:px-0px pt-50px mb-35px md:mb-100px lg:mb-130px md:pt-100px lg:pt-90px lg+:pt-104px md:max-w-672px lg:max-w-720px lg+:max-w-1088px">
        <img
          src={ImageBackgroundMobile}
          alt="background"
          className=" md:hidden absolute max-w-none -z-10 -bottom-33px -right-155px w-633px"
        />
        <img
          src={ImageBackgroundTablet}
          alt="background"
          className="hidden md:block absolute max-w-none -z-10 -bottom-80px lg:-bottom-102px lg+:-bottom-130px -right-512px lg:-right-370px lg+:-right-525px w-1691px lg:w-1453px lg+:w-2061px"
        />
        <div className="mb-3px">
          <Text typography="h3">{dateToday}</Text>
        </div>
        <div className="flex mb-12px md:mb-32px">
          <Text typography="h4">{minutesToRead}&nbsp;</Text>
          <Text typography="h4">{minutesToReadText}</Text>
        </div>
        <Text text={text} />
      </div>
    </div>
  );
};

BlogPostContent.propTypes = {
  text: PropTypes.object,
  minutesToRead: PropTypes.string,
  minutesToReadText: PropTypes.string,
  date: PropTypes.string,
  className: PropTypes.string,
};

BlogPostContent.defaultProps = {
  minutesToRead: "10",
  minutesToReadText: "minute to read",
  date: "2021-09-01",
  className: "",
};

export default BlogPostContent;
