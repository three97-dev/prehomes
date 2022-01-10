import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";
import TileShadow from "../basic/tile-shadow/TileShadow";

import IconClose from "../../../assets/old_assets/pages/home/business-lifecycle-customer-icon-close.svg";

const CustomerType = ({ image, title, subtitle, question, answer, onClick, color, className }) => {
  return (
    <TileShadow color={color} hasContentBg={false} className={className}>
      <div className="relative max-w-318px md:max-w-672px lg:max-w-1246px">
        <button onClick={onClick} className="z-10px p-10px top-10px right-10px absolute">
          <img src={IconClose} alt="close" className="arrow-shadow w-16px xl:w-18px" />
        </button>
        <div className="pt-30px pb-50px md:pb-75px mx-36px lg:mx-92px xl:mx-138px">
          <Image image={image} className="mx-auto w-110px md:w-130px xl:w-150px" />
          <Text typography="h2" className="text-center mt-15px md:mt-10px">
            {title}
          </Text>
          <Text text={subtitle} typography="body" className="mt-20px" />
          <Text typography="h3" className="mt-20px mb-25px">
            {question}
          </Text>
          <Text text={answer} className="modal-text mt-17px" />
        </div>
      </div>
    </TileShadow>
  );
};

CustomerType.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.object,
  question: PropTypes.string,
  answer: PropTypes.object,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

CustomerType.defaultProps = {
  title: "some title",
  subtitle: "some subtitle",
  question: "some question",
  answer: "some answer",
  color: "type1",
  className: "",
  onClick: () => {},
};

export default CustomerType;

// export const query = graphql`
//   fragment CustomerTypeModal on ContentfulCustomerTypeModal {
//     color
//     image {
//       ...Image
//     }
//     title
//     subtitle {
//       childMarkdownRemark {
//         html
//       }
//     }
//     question
//     answer {
//       raw
//     }
//   }
// `;
