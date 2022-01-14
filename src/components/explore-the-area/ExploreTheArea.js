import React from "react";

import Pedestrian from "../../assets/project/pedestrian.svg";
import Cyclist from "../../assets/project/cyclist.svg";
import Bus from "../../assets/project/bus.svg";
import helpMarkImage from "../../assets/help-mark/help-mark.svg";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./ExploreTheArea.css";

const ExploreTheArea = ({
  title,
  walkScoreLabel,
  walkScoreTooltip,
  bikeScoreLabel,
  bikeScoreTooltip,
  walkScoreNumber,
  bikeScoreNumber,
  busScoreLabel,
  busScoreNumber,
  className,
}) => {
  const isDesktop = useApplyAfterWidth(768);
  return (
    <div className={`px-25px lg:px-120px pt-50px lg:pt-0px ${className}`}>
      <h2 className="text-tundora md:text-black-gray">{title}</h2>
      {walkScoreNumber || bikeScoreNumber || busScoreNumber ? (
        <div className="grid md:grid-flow-col auto-cols-min gap-x-114px mt-29px">
          {walkScoreNumber ? (
            <div className="grid items-center walk-score-grid-area-mobile md:walk-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="walk-score-grid-pedestrian-area justify-self-end">
                <img src={Pedestrian} />
              </div>
              <h3 className="walk-score-grid-title-area text-dark-orange">{walkScoreLabel}</h3>
              <h3 className="walk-score-grid-number-area text-tundora md:text-black-gray">{walkScoreNumber}</h3>
              <div className="hidden md:block walk-score-grid-helpmark-area">
                <img src={helpMarkImage} title={walkScoreTooltip} />
              </div>
            </div>
          ) : null}
          {bikeScoreNumber ? (
            <div className="grid items-center bike-score-grid-area-mobile md:bike-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="bike-score-grid-pedestrian-area">
                <img src={Cyclist} />
              </div>
              <h3 className="bike-score-grid-title-area text-dark-orange">{bikeScoreLabel}</h3>
              <h3 className="bike-score-grid-number-area text-tundora md:text-black-gray">{bikeScoreNumber}</h3>
              <div className="hidden md:block bike-score-grid-helpmark-area">
                <img src={helpMarkImage} title={bikeScoreTooltip} />
              </div>
            </div>
          ) : null}
          {busScoreNumber ? (
            <div className="grid items-center transit-sckore-grid-area-mobile  ml-3px md:ml-0px">
              <div className="transit-sckore-grid-pedestrian-area">
                <img src={Bus} />
              </div>
              <h3 className="transit-sckore-grid-title-area text-dark-orange">{busScoreLabel}</h3>
              <h3 className="transit-sckore-grid-number-area text-tundora md:text-black-gray">{busScoreNumber}</h3>
              <div className="hidden md:block transit-sckore-grid-helpmark-area">
                <img src={helpMarkImage} title="Lorem ipsen" />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ExploreTheArea;
