import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Text from "../basic/text/Text";
import TileShadow from "../basic/tile-shadow/TileShadow";
import Image from "../basic/image/Image";

//bg images
import ImageFABackground1TabletWeb from "../../../assets/old_assets/pages/home/fractional-approach-bg-1-tablet-web.svg";
import ImageFABackground1WebHd from "../../../assets/old_assets/pages/home/fractional-approach-bg-1-webhd.svg";
import ImageFABackground2 from "../../../assets/old_assets/pages/home/fractional-approach-bg-2.svg";
import ImageFABackground4Tablet from "../../../assets/old_assets/pages/home/fractional-approach-bg-4-tablet.svg";
import ImageFABackground4Web from "../../../assets/old_assets/pages/home/fractional-approach-bg-4-web.svg";
import ImageFABackground4WebHd from "../../../assets/old_assets/pages/home/fractional-approach-bg-4-webhd.svg";
import ImageFABackground5 from "../../../assets/old_assets/pages/home/fractional-approach-bg-5.svg";

import "./FractionalApproach.css";

const FractionalApproach = ({
  title,
  description,
  image,
  imageDiagram,
  stats,
  statsDescription,
  subtitle,
  subtitleContent,
  tile1Number,
  tile1Description,
  tile2Number,
  tile2Description,
  titlePieChart,
  subtitlePieChart,
  content,
  leftBlockTitle,
  leftBlockContent,
  rightBlockTitle,
  rightBlockContent,
  centerBlockTitle,
  centerBlockContent,
  className,
  ...otherProps
}) => {
  return (
    <div className={`grid justify-items-center overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative justify-items-center fa-grid-mobile md:fa-grid-tablet lg:fa-grid-web-small xl:fa-grid-web px-36px md:px-81px md:mt-37px lg:mt-65px xl:mt-108px md:mb-50px lg:mb-160px xl:mb-233px">
        <img
          src={ImageFABackground1TabletWeb}
          alt="background"
          className="hidden md:block xl:hidden absolute -z-10 -top-37px lg:-top-65px -left-54px lg:-left-94px w-135px lg:w-175px"
        />
        <img
          src={ImageFABackground1WebHd}
          alt="background"
          className="hidden xl:block absolute -z-10 -top-108px -left-86px"
        />
        <img
          src={ImageFABackground2}
          alt="background"
          className="hidden md:block absolute -z-10 top-84px lg:top-126px xl:top-41px -right-18px lg:-right-75px xl:-right-91px w-92px xl:w-131px"
        />
        <img
          src={ImageFABackground4Tablet}
          alt="background"
          className="hidden md:block lg:hidden max-w-none absolute -z-10 -bottom-50px -right-82px"
        />
        <img
          src={ImageFABackground4Web}
          alt="background"
          className="hidden lg:block xl:hidden max-w-none absolute -z-10 -bottom-95px -right-135px"
        />
        <img
          src={ImageFABackground4WebHd}
          alt="background"
          className="hidden xl:block absolute max-w-none -z-10 -bottom-120px -right-150px"
        />

        <img
          src={ImageFABackground5}
          alt="background"
          className="hidden md:block xl:hidden absolute -z-20 top-714px lg:-top-90px xl:-top-97px -right-47px lg:-right-210px xl:right-3px xl:w-526px"
        />
        <div className="area-fa-border w-full border-t-2 border-line-color2 md:mt-50px lg:mt-32px xl:mt-45px"></div>
        <div className="area-fa-heading md:mb-100px lg:mb-120px xl:mb-132px max-w-500px lg:max-w-720px xl:max-w-none">
          <Text typography="h2" className="text-center">
            {title}
          </Text>
        </div>
        <div className="area-fa-image grid justify-items-center md:justify-items-start md:mr-40px lg:mr-0px lg:ml-115px xl:ml-150px md:mt-20px lg:mt-0px xl:-mt-22px lg:mb-18px xl:mb-0px">
          <Image
            image={image}
            width={388}
            height={114}
            className="mt-29px lg:mt-12px md:w-328px lg:w-260px xl:w-398px"
          />
        </div>
        <div className="area-fa-stats mt-25px md:mt-54px lg:mt-2px xl:mt-0px mb-50px md:mb-0px lg:mb-18px xl:mb-0px md:mr-30px lg:mr-10px lg:ml-22px text-center">
          <Text typography="h1">{stats}</Text>
          <Text typography="h3" className="mt-6px md:mt-4px md:mr-2px lg:mr-0px">
            {statsDescription}
          </Text>
        </div>
        <div className="area-fa-subtitle pt-52px md:pt-0px lg:ml-8px xl:ml-0px">
          <Text typography="h3" className="mb-22px">
            {subtitle}
          </Text>
          <Text text={subtitleContent} typography="body" />
        </div>
        <div className="area-fa-tile1 flex flex-col items-center justify-self-center lg:justify-self-start mt-25px md:mt-0px lg:mt-18px xl:mt-0px md:ml-40px lg:ml-10px">
          <TileShadow color="type3">
            <Text
              typography="stats"
              className="flex items-center justify-center w-154px h-154px md:w-182px md:h-182px lg:w-168px lg:h-168px xl:w-260px xl:h-260px"
            >
              {tile1Number}
            </Text>
          </TileShadow>
          <Text typography="h4" className="text-center mt-42px md:mt-45px xl:mt-52px md:max-w-168px xl:max-w-260px">
            {tile1Description}
          </Text>
        </div>
        <div className="area-fa-tile2 justify-self-center lg:justify-self-end md:ml-4px mt-52px md:mt-0px lg:mt-18px xl:mt-0px md:mr-25px lg:mr-90px xl:mr-130px flex flex-col items-center">
          <TileShadow color="type5" className="md:mr-10p">
            <Text
              typography="stats"
              className="flex items-center justify-center w-154px h-154px md:w-182px md:h-182px lg:w-168px lg:h-168px xl:w-260px xl:h-260px"
            >
              {tile2Number}
            </Text>
          </TileShadow>
          <Text
            typography="h4"
            className="text-center mt-37px md:mt-45px xl:mt-52px mb-50px lg:mb-0px lg:max-w-168px xl:max-w-260px"
          >
            {tile2Description}
          </Text>
        </div>
        <div className="area-fa-content-pie md:mb-50px lg:mb-30px xl:mb-0px lg:pr-100px xl:pr-130px">
          <Text typography="h2" className="text-center md:text-left md:mt-50px lg:mt-50px">
            {titlePieChart}
          </Text>
          <Text typography="h3" className="mt-50px md:mt-23px lg:mt-22px">
            {subtitlePieChart}
          </Text>
          <Text typography="body" className="mt-30px md:mt-50px lg:mt-23px text-tile-bg-4">
            {content}
          </Text>
        </div>
        <div className="area-fa-diagram-pie grid relative h-620px md:h-637px lg:h-580px xl:h-720px mb-45px md:mb-0px lg:ml-10px">
          <div className="grid items-end text-center absolute justify-self-start w-154px md:w-242px lg:w-260px md:-left-112px lg:-left-43px xl:-left-60px bottom-336px md:bottom-367px lg:bottom-357px xl:bottom-457px">
            <Text typography="h4">{leftBlockTitle}</Text>
            <Text typography="body" className="mt-20px">
              {leftBlockContent}
            </Text>
            <div className="justify-self-center w-2px h-50px md:h-75px lg:h-50px xl:h-86px mt-20px bg-line-color" />
          </div>
          <div className="grid items-end text-center absolute justify-self-end w-154px md:w-242px lg:w-260px md:-right-110px lg:-right-40px xl:-right-62px bottom-316px md:bottom-347px lg:bottom-323px xl:bottom-419px">
            <Text typography="h4">{rightBlockTitle}</Text>
            <Text typography="body" className="mt-20px">
              {rightBlockContent}
            </Text>
            <div className="w-2px h-30px md:h-75px lg:h-45px xl:h-87px mt-20px bg-line-color justify-self-center" />
          </div>
          <div className="grid items-end text-center absolute justify-self-center md:w-672px lg:w-535px top-467px md:top-457px lg:top-501px xl:top-584px xl:right-70px">
            <div className="w-2px h-5px md:h-75px lg:h-27px xl:h-80px bg-line-color justify-self-center" />
            <Text typography="h4" className="mt-20px">
              {centerBlockTitle}
            </Text>
            <Text typography="body" className="mt-20px">
              {centerBlockContent}
            </Text>
          </div>
          <StaticImage
            src="../../../assets/old_assets/pages/crm/pie-chart-img.png"
            alt="diagram"
            width={690}
            height={362}
            className="justify-self-center w-318px md:w-450px xl:w-690px mt-280px md:mt-269px lg:mt-250px xl:mt-225px h-166px md:h-233px xl:h-362px"
            quality={100}
            placeholder="blurred"
            layout="constrained"
          />
        </div>
      </div>
    </div>
  );
};

FractionalApproach.propTypes = {
  title: PropTypes.string,
  description: PropTypes.object,
  image: PropTypes.object,
  imageDiagram: PropTypes.object,
  stats: PropTypes.string,
  statsDescription: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleContent: PropTypes.object,
  tile1Number: PropTypes.string,
  tile1Description: PropTypes.string,
  tile2Number: PropTypes.string,
  tile2Description: PropTypes.string,
  titlePieChart: PropTypes.string,
  subtitlePieChart: PropTypes.string,
  content: PropTypes.string,
  leftBlockTitle: PropTypes.string,
  leftBlockContent: PropTypes.string,
  rightBlockTitle: PropTypes.string,
  rightBlockContent: PropTypes.string,
  centerBlockTitle: PropTypes.string,
  centerBlockContent: PropTypes.string,
  className: PropTypes.string,
};

FractionalApproach.defaultProps = {
  className: "",
  subtitle: "some subtitle",
  subtitleContent: "some subtitleContent",
  title: "some title",
  description: "some description",
  stats: "some stats",
  statsDescription: "some statsDescription",
  tile1Number: "some tile1Number",
  tile1Description: "some tile1Description",
  tile2Number: "some tile2Number",
  tile2Description: "some tile2Description",
  titlePieChart: "some titlePieChart",
  subtitlePieChart: "some subtitlePieChart",
  content: "some content",
  leftBlockTitle: "some leftBlockTitle",
  leftBlockContent: "some leftBlockContent",
  rightBlockTitle: "some rightBlockTitle",
  rightBlockContent: "some rightBlockContent",
  centerBlockTitle: "some centerBlockTitle",
  centerBlockContent: "some centerBlockContent",
};

export default FractionalApproach;

// export const query = graphql`
//   fragment FractionalApproach on ContentfulFractionalApproach {
//     title
//     subtitle
//     subtitleContent {
//       childMarkdownRemark {
//         html
//       }
//     }
//     description {
//       raw
//     }
//     statsValue
//     statsDescription
//     image {
//       ...Image
//     }
//     tile1Number
//     tile1Description
//     tile2Number
//     tile2Description
//     titlePieChart
//     subtitlePieChart
//     content
//     leftBlockTitle
//     leftBlockContent
//     rightBlockTitle
//     rightBlockContent
//     centerBlockTitle
//     centerBlockContent
//   }
// `;
