import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "../basic/button/Button";
import Image from "../basic/image/Image";
import RRenderer from "../basic/markdown/Markdown";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";
import ModalVideo from "../modal-video/ModalVideo";
import YouTubeVideo from "../basic/youtube-video/YouTubeVideo";

import "./ProjectOverview.css";

const ProjectOverview = ({
  title,
  address,
  content,
  labelPriceSQFT,
  priceSQFT,
  labelPriceNeighborhood,
  priceNeighborhood,
  labelPriceCity,
  minPrice,
  maxPrice,
  buttonLabel,
  priceCity,
  videoLink,
  videoPreviewImage,
  className,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const isDesktop = useApplyAfterWidth(1100);

  return (
    <div
      className={`md+:px-20px lg:px-120px w-full lg:pt-94px lg:pb-40px ${className}`}
    >
      <div className="md+:grid md+:project-overview-grid mx-auto font-metropolis font-bold md:gap-x-62px lg+:gap-x-160px">
        <div className="md+:hidden border-t-2 border-gray-border w-full mb-40px"></div>
        <div className="project-overview-price-area px-25px lg:px-0px">
          <div className="mx-auto">
            <div className="pb-13px text-29px md:text-32px leading-44px md:leading-50px text-tundora md:text-black-gray font-poppins">
              ${minPrice.toLocaleString("en-US")} - ${maxPrice.toLocaleString("en-US")}
            </div>
            <div className="pb-17px md+:pb-20px text-22px md+:text-26px leading-26px md+:leading-30px text-dark-orange font-late-november font-normal">
              {labelPriceSQFT}
            </div>
            <div className="pb-17px md+:pb-25px text-14px md+:text-16px leading-24px font-poppins font-normal">
              ${priceSQFT.toLocaleString("en-US")}{" "}
            </div>
            <div className="pb-17px md+:pb-20px text-22px md+:text-26px leading-26px md+:leading-30px text-dark-orange font-late-november font-normal">
              {labelPriceNeighborhood}
            </div>
            <div className="text-14px md+:text-16px leading-24px font-poppins font-normal">
              ${priceNeighborhood.toLocaleString("en-US")}
            </div>
            <div className="py-17px md+:py-20px text-22px md+:text-26px leading-26px md+:leading-30px text-dark-orange font-late-november font-normal">
              {labelPriceCity}
            </div>
            <div className="text-14px md+:text-16px leading-24px font-poppins font-normal">
              ${priceCity.toLocaleString("en-US")}
            </div>
          </div>
        </div>
        {isDesktop ? (
          <div className="project-overview-video-area flex items-center">
            <Button
              variants="black_gradient"
              onClick={() => (modalIsOpen ? setIsOpen(false) : setIsOpen(true))}
              btnClasses="w-147px h-54px"
            >
              <div className="text-14px leading-17px tracking-tighter font-bold font-rosario">{buttonLabel}</div>
            </Button>
            <ModalVideo modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} modalVideoLink={videoLink} />
            <div>
              <Image image={videoPreviewImage} className="w-251px ml-47px" />
            </div>
          </div>
        ) : (
          <YouTubeVideo media={videoLink} className="w-full h-251px sm+:h-456px mx-auto px-25px mt-45px" />
        )}

        <div className="md+:hidden border-t-2 border-gray-border w-full mt-50px mb-40px"></div>

        <div className="project-overview-content-area px-25px lg:px-0px">
          <div className="ml-3px pb-13px text-29px md:text-32px leading-44px md:leading-50px font-poppins text-tundora md:text-black-gray">
            {title}
          </div>
          <div className="ml-3px pb-20px text-22px md+:text-26px leading-26px md+:leading-30px font-late-november font-normal text-dark-orange">
            {address}
          </div>
          <div className="text-14px md+:text-16px leading-24px font-light font-poppins text-black-gray">
            <RRenderer
              data={content}
              config={{
                p: "mb-25px",
              }}
            />
          </div>
        </div>
        <div className="md+:hidden border-t-2 border-gray-border w-full mt-50px"></div>
      </div>
      <div />
    </div>
  );
};

ProjectOverview.propTypes = {
  title: PropTypes.string,
  videoLink: PropTypes.string,
  address: PropTypes.string,
  content: PropTypes.object,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  labelPriceSQFT: PropTypes.string,
  priceSQFT: PropTypes.number,
  labelPriceNeighborhood: PropTypes.string,
  priceNeighborhood: PropTypes.number,
  labelPriceCity: PropTypes.string,
  buttonLabel: PropTypes.string,
  priceCity: PropTypes.number,
  videoPreviewImage: PropTypes.object,
  className: PropTypes.string,
};
ProjectOverview.defaultProps = {
  title: "",
  address: "",
  content: {},
  minPrice: "",
  maxPrice: "",
  labelPriceSQFT: "",
  priceSQFT: "",
  labelPriceNeighborhood: "",
  priceNeighborhood: "",
  labelPriceCity: "",
  buttonLabel: "",
  priceCity: "",
  videoLink: "",
  videoPreviewImage: {},
  className: "",
};

export default ProjectOverview;
