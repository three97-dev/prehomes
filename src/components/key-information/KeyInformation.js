import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import Markdown from "../basic/markdown/Markdown";

import "./KeyInformation.css";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";
import { statusResolver } from "../../utils/translationResolvers";

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
  className,
}) => {
  const isDesktop = useApplyAfterWidth(768);
  const statusValueToShow = statusResolver(statusValue);

  return (
    <div className={`grid bg-white-pink md:bg-transparent px-25px lg:px-120px pb-20px ${className}`}>
      <h2 className="text-tundora md:text-black-gray mt-48px mb-20px">{title}</h2>
      <div className="key-info-grid-area-wrapper-mobile md:key-info-grid-area-wrapper">
        {isDesktop ? (
          <div className="key-info-grid-status-area">
            <h3 className="text-dark-orange">{statusLabel}</h3>
            <p className="text-black-gray mt-20px">{statusValueToShow}</p>
          </div>
        ) : (
          <div className="key-info-grid-status-area">
            <h3 className="text-dark-orange">{labelPriceSQFT}</h3>
            <p className="text-black-gray mt-20px">{pricePerSqft}</p>
          </div>
        )}

        <div className="key-info-grid-type-area">
          <h3 className="text-dark-orange">{typeLabel}</h3>
          <p className="text-black-gray mt-20px">{typeValue}</p>
        </div>
        <div className="key-info-grid-launch-date-area">
          <h3 className="text-dark-orange">{launchDateLabel}</h3>
          <p className="text-black-gray mt-20px">{DateTime.fromISO(launchDateValue).toFormat("dd / LL / yyyy")}</p>
        </div>
        <div className="key-info-grid-estimated-occupancy-area">
          <h3 className="text-dark-orange">{estimatedOccupancyLabel}</h3>
          <p className="text-black-gray mt-20px">
            {DateTime.fromISO(estimatedOccupancyValue).toFormat("dd / LL / yyyy")}
          </p>
        </div>
        <div className="key-info-grid-major-intersection-area">
          <h3 className="text-dark-orange">{majorIntersectionLabel}</h3>
          <div className="mt-20px">
            <Markdown
              data={majorIntersectionValue}
              config={{
                p: "text-black-gray mt-20px",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-architects-area">
          <h3 className="text-dark-orange">{architectsLabel}</h3>
          <div className="mt-20px">
            <Markdown
              data={architectsValue}
              config={{
                p: "text-black-gray",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-deposit-area">
          <h3 className="text-dark-orange">{depositLabel}</h3>
          <div className="mt-20px">
            <Markdown
              data={depositValue}
              config={{
                p: "text-black-gray",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-cash-deposit-area">
          <h3 className="text-dark-orange">{cashDepositLabel}</h3>
          <p className="text-black-gray mt-20px">{cashDepositValue ? cashDepositValue.toLocaleString("en-US") : ""}</p>
        </div>
        <div className="key-info-grid-deposit-structure-area">
          <h3 className="text-dark-orange">{depositStructureLabel}</h3>
          <div className="mt-20px">
            <Markdown
              data={depositStructureValue}
              config={{
                p: "text-black-gray",
              }}
            />
          </div>
        </div>
        <div className="key-info-grid-locker-maintenance-area">
          <h3 className="text-dark-orange">{lockerMaintenanceLabel}</h3>
          <p className="text-black-gray mt-20px">${lockerMaintenanceValue ? lockerMaintenanceValue.toLocaleString("en-US") : ""}</p>
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
