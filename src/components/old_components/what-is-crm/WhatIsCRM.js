import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Text from "../basic/text/Text";
import Border from "../basic/border/Border";

import "./WhatIsCRM.css";

const WhatIsCRM = ({ title1, subtitle1, contentText1, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative what-is-crm-grid-mobile md:what-is-crm-grid-tablet lg:what-is-crm-grid-web xl:what-is-crm-grid-webhd mx-36px lg:mx-0px lg:pt-130px pb-50px">
        <div className="area-what-is-crm-title-1 lg:max-w-444px xl:max-w-672px">
          <Text typography="h2" className="mt-50px xl:mt-75px">
            {title1}
          </Text>
          {subtitle1 ? (
            <Text typography="h3" className="mt-22px">
              {subtitle1}
            </Text>
          ) : null}
        </div>
        <Border borderSide="bottom" className="area-what-is-crm-title-1 hidden lg:block" />

        <div className="area-what-is-crm-text-1">
          <Text text={contentText1} typography="body" className="mt-22px lg:mt-50px xl:mt-75px mb-50px lg:mb-48px" />
        </div>
        <Border borderSide="bottom" className="area-what-is-crm-text-1" />
        <Border borderSide="top" className="area-what-is-crm-title-2" />
        <Border borderSide="top" className="area-what-is-crm-text-2 hidden lg:block" />
      </div>
    </div>
  );
};

WhatIsCRM.propTypes = {
  title1: PropTypes.string,
  subtitle1: PropTypes.string,
  contentText1: PropTypes.object,
  className: PropTypes.string,
};

WhatIsCRM.defaultProps = {
  title1: "Title 1",
  subtitle1: "Subtitle 1",
  contentText1: "Content Text 1",
  className: "",
};

export default WhatIsCRM;

// export const query = graphql`
//   fragment WhatIsCrm on ContentfulWhatIsCrm {
//     title1
//     subtitle1
//     contentText1 {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
// `;
