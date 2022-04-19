import React from "react";
import PropTypes from "prop-types";

import RRenderer from "../basic/markdown/Markdown";

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
  priceCity,
  className,
}) => {
  return (
    <div className={`lg:px-120px w-full py-64px ${className}`}>
      <div className="md+:grid md+:project-overview-grid mx-auto md:gap-x-62px lg+:gap-x-160px">
        <div className="md+:hidden border-t-2 border-gray-border w-full mb-40px"></div>
        <div className="project-overview-price-area px-25px lg:px-0px w-442px">
          <div className="mx-auto">
            <h2 className="overview-first-level-heading">
              ${minPrice ? minPrice.toLocaleString("en-US") : ""} - ${maxPrice ? maxPrice.toLocaleString("en-US") : ""}
            </h2>
            <h3 className="overview-second-level-heading">{labelPriceSQFT}</h3>
            <p className="overview-paragraph">${priceSQFT ? priceSQFT.toLocaleString("en-US") : ""} </p>
            <h3 className="overview-second-level-heading">{labelPriceNeighborhood}</h3>
            <p className="overview-paragraph">${priceNeighborhood ? priceNeighborhood.toLocaleString("en-US") : ""}</p>
            <h3 className="overview-second-level-heading">{labelPriceCity}</h3>
            <p className="overview-paragraph">${priceCity ? priceCity.toLocaleString("en-US") : ""}</p>
          </div>
        </div>

        <div className="md+:hidden border-t-2 border-gray-border w-full mt-50px mb-40px"></div>

        <div className="project-overview-content-area px-25px lg:px-0px">
          <h2 className="overview-first-level-heading">{title}</h2>
          <h3 className="overview-second-level-heading">{address}</h3>
          <div className="text-black-gray">
            <RRenderer
              data={content}
              config={{
                p: "mb-25px text-mild-black text-16px font-normal last-paragraph",
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
