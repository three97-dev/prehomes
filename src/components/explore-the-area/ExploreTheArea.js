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
  bikeScoreLabel,
  walkScoreNumber,
  bikeScoreNumber,
  busScoreLabel,
  busScoreNumber,
  className,
}) => {
  const isDesktop = useApplyAfterWidth(768);
  return (
    <div className={`px-25px lg:px-120px pt-50px lg:pt-0px bg-white-pink md:bg-transparent ${className}`}>
      <div className="text-29px leading-29px text-tundora font-bold font-metropolis">{title}</div>
      {walkScoreNumber || bikeScoreNumber || busScoreNumber ? (
        <div className="grid md:grid-flow-col auto-cols-min gap-x-114px mt-29px">
          {walkScoreNumber ? (
            <div className="walk-score-grid-area-mobile md:walk-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="walk-score-grid-pedestrian-area justify-self-end">
                <img src={Pedestrian} />
              </div>
              <div className="walk-score-grid-title-area text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold font-metropolis">
                {walkScoreLabel}
              </div>
              <div className="walk-score-grid-number-area text-18px md:text-22px leading-18px md:leading-22px text-black font-bold font-metropolis">
                {walkScoreNumber}
              </div>
              <div className="hidden md:block walk-score-grid-helpmark-area">
                <img src={helpMarkImage} />
              </div>
            </div>
          ) : null}
          {bikeScoreNumber ? (
            <div className="bike-score-grid-area-mobile md:bike-score-grid-area mb-17px md:mb-0px ml-3px md:ml-0px">
              <div className="bike-score-grid-pedestrian-area">
                <img src={Cyclist} />
              </div>
              <div className="bike-score-grid-title-area text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold font-metropolis">
                {bikeScoreLabel}
              </div>
              <div className="bike-score-grid-number-area text-18px md:text-22px leading-18px md:leading-22px text-black font-bold font-metropolis">
                {bikeScoreNumber}
              </div>
              <div className="hidden md:block bike-score-grid-helpmark-area">
                <img src={helpMarkImage} />
              </div>
            </div>
          ) : null}
          {busScoreNumber ? (
            <div className="grid md:hidden transit-sckore-grid-area-mobile  ml-3px md:ml-0px">
              <div className="transit-sckore-grid-pedestrian-area">
                <img src={Bus} />
              </div>
              <div className="transit-sckore-grid-title-area text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold font-metropolis">
                {busScoreLabel}
              </div>
              <div className="transit-sckore-grid-number-area text-18px md:text-22px leading-18px md:leading-22px text-black font-bold font-metropolis">
                {busScoreNumber}
              </div>
              <div className="hidden md:block transit-sckore-grid-helpmark-area">
                <img src={helpMarkImage} />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ExploreTheArea;
