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
      <div className="text-29px md:text-32px leading-44px md:leading-50px text-tundora md:text-black-gray font-poppins font-bold">
        {title}
      </div>
      {walkScoreNumber || bikeScoreNumber || busScoreNumber ? (
        <div className="grid md:grid-flow-col auto-cols-min gap-x-114px mt-29px">
          {walkScoreNumber ? (
            <div className="grid items-center walk-score-grid-area-mobile md:walk-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="walk-score-grid-pedestrian-area justify-self-end">
                <img src={Pedestrian} />
              </div>
              <div className="walk-score-grid-title-area text-22px md:text-26px leading-26px md:leading-30px text-dark-orange font-late-november font-normal">
                {walkScoreLabel}
              </div>
              <div className="walk-score-grid-number-area text-22px md:text-26px leading-26px md:leading-30px text-tundora md:text-black-gray font-late-november font-normal">
                {walkScoreNumber}
              </div>
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
              <div className="bike-score-grid-title-area text-22px md:text-26px leading-26px md:leading-30px text-dark-orange font-late-november font-normal">
                {bikeScoreLabel}
              </div>
              <div className="bike-score-grid-number-area text-22px md:text-26px leading-26px md:leading-30px text-tundora md:text-black-gray font-late-november font-normal">
                {bikeScoreNumber}
              </div>
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
              <div className="transit-sckore-grid-title-area text-22px md:text-26px leading-26px md:leading-30px text-dark-orange font-late-november md:font-normal">
                {busScoreLabel}
              </div>
              <div className="transit-sckore-grid-number-area text-22px md:text-26px leading-26px md:leading-30px text-tundora md:text-black-gray font-late-november md:font-normal">
                {busScoreNumber}
              </div>
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
