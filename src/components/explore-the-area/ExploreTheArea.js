import React from "react";

import Pedestrian from "../../assets/project/pedestrian.svg";
import Cyclist from "../../assets/project/cyclist.svg";
import Bus from "../../assets/project/bus.svg";

import "./ExploreTheArea.css";

const ExploreTheArea = ({
  title,
  walkScoreLabel,
  bikeScoreLabel,
  walkScoreNumber,
  bikeScoreNumber,
  busScoreLabel,
  busScoreNumber,
  className,
}) => {
  return (
    <div className={`px-25px lg:px-120px ${className}`}>
      <h2 className="explore-first-level-heading">{title}</h2>
      {walkScoreNumber || bikeScoreNumber || busScoreNumber ? (
        <div className="grid md:grid-flow-col auto-cols-min gap-x-114px">
          {walkScoreNumber ? (
            <div className="grid items-center walk-score-grid-area-mobile md:walk-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="walk-score-grid-pedestrian-area justify-self-end">
                <img src={Pedestrian} />
              </div>
              <h3 className="walk-score-grid-title-area explore-second-level-heading">{walkScoreLabel}</h3>
              <h3 className="walk-score-grid-number-area explore-second-level-heading explore-second-level-modifier">
                {walkScoreNumber}
              </h3>
            </div>
          ) : null}
          {bikeScoreNumber ? (
            <div className="grid items-center bike-score-grid-area-mobile md:bike-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="bike-score-grid-pedestrian-area">
                <img src={Cyclist} />
              </div>
              <h3 className="bike-score-grid-title-area explore-second-level-heading">{bikeScoreLabel}</h3>
              <h3 className="bike-score-grid-number-area explore-second-level-heading explore-second-level-modifier">
                {bikeScoreNumber}
              </h3>
            </div>
          ) : null}
          {busScoreNumber ? (
            <div className="grid items-center transit-sckore-grid-area-mobile  ml-3px md:ml-0px">
              <div className="transit-sckore-grid-pedestrian-area">
                <img src={Bus} />
              </div>
              <h3 className="transit-sckore-grid-title-area explore-second-level-heading">{busScoreLabel}</h3>
              <h3 className="transit-sckore-grid-number-area explore-second-level-heading explore-second-level-modifier">
                {busScoreNumber}
              </h3>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ExploreTheArea;
