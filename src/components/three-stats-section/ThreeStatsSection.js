import React from "react";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./ThreeStatsSection.css";

const ThreeElementsSection = ({
  statOneLabel,
  statOneValue,
  statTwoLabel,
  statTwoValue,
  statThreeLabel,
  statThreeValue,
  className,
}) => {
  const isDesktop = useApplyAfterWidth(599);

  return (
    <div className={`sm+:three-elements-grid ${className}`}>
      <div>
        <div className="three-elements-grid-title">{isDesktop ? statOneLabel.toUpperCase() : statOneLabel}</div>
        <div className="three-elements-grid-description">{isDesktop ? statOneValue : statOneValue}</div>
      </div>
      <div>
        <div className="three-elements-grid-title">{isDesktop ? statTwoLabel.toUpperCase() : statTwoLabel}</div>
        <div className="three-elements-grid-description">{isDesktop ? statTwoValue.toUpperCase() : statTwoValue}</div>
      </div>
      <div>
        <div className="three-elements-grid-title">{isDesktop ? statThreeLabel.toUpperCase() : statThreeLabel}</div>
        <div className="three-elements-grid-description">
          {isDesktop ? statThreeValue.toUpperCase() : statThreeValue}
        </div>
      </div>
    </div>
  );
};

export default ThreeElementsSection;
