import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import Markdown from "../basic/markdown/Markdown";

import "./KeyInformation.css";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

const KeyInformation = ({
  title,
  statusLabel,
  statusValue,
  typeLabel,
  typeValue,
  launchDateLabel,
  launchDateValue,
  labelPriceSQFT,
  pricePerSqft,
  estimatedOccupancyLabel,
  estimatedOccupancyValue,
  majorIntersectionLabel,
  majorIntersectionValue,
  architectsLabel,
  architectsValue,
  depositLabel,
  depositValue,
  cashDepositLabel,
  cashDepositValue,
  depositStructureLabel,
  depositStructureValue,
  lockerMaintenanceLabel,
  lockerMaintenanceValue,
}) => {
  const isDesktop = useApplyAfterWidth(768);
  return (
    <div className="grid bg-white-pink md:bg-transparent px-25px lg:px-120px pb-20px">
      <div className="grid justify-items-start text-29px leading-29px text-tundora font-bold tracking-wide font-metropolis mt-58px mb-20px">
        {title}
      </div>
      <div className="key-info-grid-area-wrapper-mobile md:key-info-grid-area-wrapper">
        {isDesktop ? (
          <div className="key-info-grid-status-area">
            <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
              {statusLabel}
            </div>
            <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
              {statusValue}
            </div>
          </div>
        ) : (
          <div className="key-info-grid-status-area">
            <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
              {labelPriceSQFT}
            </div>
            <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
              {pricePerSqft}
            </div>
          </div>
        )}

        <div className="key-info-grid-type-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {typeLabel}
          </div>
          <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
            {typeValue}
          </div>
        </div>
        <div className="key-info-grid-launch-date-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {launchDateLabel}
          </div>
          <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
            {DateTime.fromISO(launchDateValue).toFormat("dd / LL / yyyy")}
          </div>
        </div>
        <div className="key-info-grid-estimated-occupancy-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {estimatedOccupancyLabel}
          </div>
          <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
            {DateTime.fromISO(estimatedOccupancyValue).toFormat("dd / LL / yyyy")}
          </div>
        </div>
        <div className="key-info-grid-major-intersection-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {majorIntersectionLabel}
          </div>
          <div className="mt-20px">
            <Markdown
              data={majorIntersectionValue}
              config={{
                p: "text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-architects-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {architectsLabel}
          </div>
          <div className="mt-20px">
            <Markdown
              data={architectsValue}
              config={{
                p: "text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-deposit-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {depositLabel}
          </div>
          <div className="mt-20px">
            <Markdown
              data={depositValue}
              config={{
                p: "text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-cash-deposit-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {cashDepositLabel}
          </div>
          <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
            {cashDepositValue.toLocaleString("en-US")}
          </div>
        </div>
        <div className="key-info-grid-deposit-structure-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {depositStructureLabel}
          </div>
          <div className="mt-20px">
            <Markdown
              data={depositStructureValue}
              config={{
                p: "text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-locker-maintenance-area">
          <div className="text-18px md:text-22px leading-18px md:leading-22px text-dark-orange font-bold tracking-wide font-metropolis">
            {lockerMaintenanceLabel}
          </div>
          <div className="text-14px md:text-16px leading-14px md:leading-16px text-black uppercase font-metropolis mt-20px">
            ${lockerMaintenanceValue.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </div>
  );
};

KeyInformation.propTypes = {
  title: PropTypes.string,
  statusLabel: PropTypes.string,
  statusValue: PropTypes.string,
  typeLabel: PropTypes.string,
  typeValue: PropTypes.string,
  launchDateLabel: PropTypes.string,
  launchDateValue: PropTypes.string,
  estimatedOccupancyLabel: PropTypes.string,
  estimatedOccupancyValue: PropTypes.string,
  majorIntersectionLabel: PropTypes.string,
  majorIntersectionValue: PropTypes.object,
  architectsLabel: PropTypes.string,
  architectsValue: PropTypes.object,
  depositLabel: PropTypes.string,
  depositValue: PropTypes.object,
  cashDepositLabel: PropTypes.string,
  cashDepositValue: PropTypes.string,
  depositStructureLabel: PropTypes.string,
  depositStructureValue: PropTypes.object,
  lockerMaintenanceLabel: PropTypes.string,
  lockerMaintenanceValue: PropTypes.number,
};

KeyInformation.defaultProps = {
  title: "Missing",
  statusLabel: "Missing",
  statusValue: "Missing",
  typeLabel: "Missing",
  typeValue: "Missing",
  launchDateLabel: "Missing",
  launchDateValue: "Missing",
  estimatedOccupancyLabel: "Missing",
  estimatedOccupancyValue: "Missing",
  majorIntersectionLabel: "Missing",
  majorIntersectionValue: "Missing",
  architectsLabel: "Missing",
  architectsValue: "Missing",
  depositLabel: "Missing",
  depositValue: "Missing",
  cashDepositLabel: "Missing",
  cashDepositValue: "Missing",
  depositStructureLabel: "Missing",
  depositStructureValue: "Missing",
  lockerMaintenanceLabel: "Missing",
  lockerMaintenanceValue: "Missing",
};
export default KeyInformation;
