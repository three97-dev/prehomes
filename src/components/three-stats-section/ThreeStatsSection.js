import React from "react";

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
  return (
    <div className={`sm+:three-elements-grid pt-10px sm+:pt-0px ${className}`}>
      <div>
        <h3 className="three-elements-grid-title sm+:hidden">{statOneLabel}</h3>
        <p className="three-elements-grid-description sm+:hidden">{statOneValue}</p>

        <div className="three-elements-grid-title eyebrow-font hidden sm+:block">{statOneLabel}</div>
        <h2 className="three-elements-grid-description hidden sm+:block">{statOneValue}</h2>
      </div>
      <div>
        <h3 className="three-elements-grid-title sm+:hidden">{statTwoLabel}</h3>
        <p className="three-elements-grid-description sm+:hidden">{statTwoValue}</p>

        <div className="three-elements-grid-title eyebrow-font hidden sm+:block">{statTwoLabel}</div>
        <h2 className="three-elements-grid-description hidden sm+:block">{statTwoValue}</h2>
      </div>
      <div>
        <h3 className="three-elements-grid-title sm+:hidden">{statThreeLabel}</h3>
        <p className="three-elements-grid-description sm+:hidden">{statThreeValue}</p>

        <div className="three-elements-grid-title eyebrow-font hidden sm+:block">{statThreeLabel}</div>
        <h2 className="three-elements-grid-description hidden sm+:block">{statThreeValue}</h2>
      </div>
    </div>
  );
};

export default ThreeElementsSection;
