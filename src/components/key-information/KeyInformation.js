import React from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import Markdown from "../basic/markdown/Markdown";
import { statusResolver } from "../../utils/translationResolvers";

import "./KeyInformation.css";

const KeyInformation = ({
  title,
  statusLabel,
  statusValue,
  typeLabel,
  typeValue,
  launchDateLabel,
  launchDateValue,
  estimatedOccupancyLabel,
  estimatedOccupancyValue,
  majorIntersectionLabel,
  majorIntersectionValue,
  architectsLabel,
  architectsValue,
  depositAmountLabel,
  depositAmountValue,
  lockerPriceLabel,
  lockerPriceValue,
  depositStructureLabel,
  depositStructureValue,
  lockerMaintenanceLabel,
  lockerMaintenanceValue,
  maintenanceFeeLabel,
  maintenanceFeeValue,
  parkingPriceLabel,
  parkingPriceValue,
  totalSuitesLabel,
  totalSuitesValue,
  parkingMaintenanceLabel,
  parkingMaintenanceValue,
  className,
}) => {
  const statusValueToShow = statusResolver(statusValue);

  return (
    <div className={`grid bg-white-pink md:bg-transparent px-25px lg:px-120px pb-20px ${className}`}>
      <h2 className="text-tundora md:text-black-gray mt-48px mb-20px">{title}</h2>
      <div className="key-info-grid-area-wrapper-mobile md:key-info-grid-area-wrapper">
        <div className="key-info-grid-status-area">
          <h3 className="text-dark-orange">{statusLabel}</h3>
          <p className="text-black-gray mt-20px">{statusValueToShow}</p>
        </div>
        <div className="key-info-grid-type-area">
          <h3 className="text-dark-orange">{typeLabel}</h3>
          <p className="text-black-gray mt-20px">{typeValue?.map(type => type.name).join(", ")}</p>
        </div>
        <div className="key-info-grid-launch-date-area">
          <h3 className="text-dark-orange">{launchDateLabel}</h3>
          <p className="text-black-gray mt-20px">
            {launchDateValue ? DateTime.fromISO(launchDateValue).toFormat("dd / LL / yyyy") : ""}
          </p>
        </div>
        <div className="key-info-grid-estimated-occupancy-area">
          <h3 className="text-dark-orange">{estimatedOccupancyLabel}</h3>
          <p className="text-black-gray mt-20px">
            {estimatedOccupancyValue ? DateTime.fromISO(estimatedOccupancyValue).toFormat("dd / LL / yyyy") : ""}
          </p>
        </div>
        <div className="key-info-grid-major-intersection-area">
          <h3 className="text-dark-orange">{majorIntersectionLabel}</h3>
          <div className="mt-20px">
            {majorIntersectionValue ? (
              <Markdown
                data={majorIntersectionValue}
                config={{
                  p: "text-black-gray mt-20px",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-architects-area">
          <h3 className="text-dark-orange">{architectsLabel}</h3>
          <div className="mt-20px">
            {architectsValue ? (
              <Markdown
                data={architectsValue}
                config={{
                  p: "text-black-gray",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-deposit-amount-area">
          <h3 className="text-dark-orange">{depositAmountLabel}</h3>
          <div className="mt-20px">
            {depositAmountValue ? (
              <Markdown
                data={depositAmountValue}
                config={{
                  p: "text-black-gray",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-deposit-structure-area">
          <h3 className="text-dark-orange">{depositStructureLabel}</h3>
          <div className="mt-20px">
            {depositStructureValue ? (
              <Markdown
                data={depositStructureValue}
                config={{
                  p: "text-black-gray",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-locker-price-area">
          <h3 className="text-dark-orange">{lockerPriceLabel}</h3>
          <p className="text-black-gray mt-20px">
            {lockerPriceValue
              ? lockerPriceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : ""}
          </p>
        </div>
        <div className="key-info-grid-locker-maintenance-area">
          <h3 className="text-dark-orange">{lockerMaintenanceLabel}</h3>
          <p className="text-black-gray mt-20px">
            {lockerMaintenanceValue
              ? lockerMaintenanceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </p>
        </div>
        <div className="key-info-grid-maintenance-fee-area">
          <h3 className="text-dark-orange">{maintenanceFeeLabel}</h3>
          <p className="text-black-gray mt-20px">
            {maintenanceFeeValue
              ? maintenanceFeeValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </p>
        </div>
        <div className="key-info-grid-parking-price-area">
          <h3 className="text-dark-orange">{parkingPriceLabel}</h3>
          <p className="text-black-gray mt-20px">
            {parkingPriceValue
              ? parkingPriceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : ""}
          </p>
        </div>
        <div className="key-info-grid-total-suites-area">
          <h3 className="text-dark-orange">{totalSuitesLabel}</h3>
          <p className="mt-20px">
            {totalSuitesValue ? (
              <Markdown
                data={totalSuitesValue}
                config={{
                  p: "text-black-gray",
                }}
              />
            ) : null}
          </p>
        </div>
        <div className="key-info-grid-parking-maintenance-area">
          <h3 className="text-dark-orange">{parkingMaintenanceLabel}</h3>
          <p className="text-black-gray mt-20px">
            {parkingMaintenanceValue
              ? parkingMaintenanceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </p>
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
  typeValue: PropTypes.array,
  launchDateLabel: PropTypes.string,
  launchDateValue: PropTypes.string,
  estimatedOccupancyLabel: PropTypes.string,
  estimatedOccupancyValue: PropTypes.string,
  majorIntersectionLabel: PropTypes.string,
  majorIntersectionValue: PropTypes.object,
  architectsLabel: PropTypes.string,
  architectsValue: PropTypes.object,
  depositAmountLabel: PropTypes.string,
  depositAmountValue: PropTypes.object,
  lockerPriceLabel: PropTypes.string,
  lockerPriceValue: PropTypes.number,
  cashDepositLabel: PropTypes.string,
  cashDepositValue: PropTypes.string,
  depositStructureLabel: PropTypes.string,
  depositStructureValue: PropTypes.object,
  lockerMaintenanceLabel: PropTypes.string,
  lockerMaintenanceValue: PropTypes.number,
  maintenanceFeeLabel: PropTypes.string,
  maintenanceFeeValue: PropTypes.number,
  parkingPriceLabel: PropTypes.string,
  parkingPriceValue: PropTypes.number,
  totalSuitesLabel: PropTypes.string,
  totalSuitesValue: PropTypes.object,
  parkingMaintenanceLabel: PropTypes.string,
  parkingMaintenanceValue: PropTypes.number,
};

KeyInformation.defaultProps = {
  title: "Missing",
  statusLabel: "Missing",
  statusValue: "Missing",
  typeLabel: "Missing",
  typeValue: [],
  launchDateLabel: "Missing",
  launchDateValue: "Missing",
  estimatedOccupancyLabel: "Missing",
  estimatedOccupancyValue: "Missing",
  majorIntersectionLabel: "Missing",
  majorIntersectionValue: "Missing",
  architectsLabel: "Missing",
  architectsValue: "Missing",
  depositAmountLabel: "Missing",
  depositAmountValue: "Missing",
  lockerPriceLabel: "Missing",
  lockerPriceValue: "Missing",
  cashDepositLabel: "Missing",
  cashDepositValue: "Missing",
  depositStructureLabel: "Missing",
  depositStructureValue: "Missing",
  lockerMaintenanceLabel: "Missing",
  lockerMaintenanceValue: "Missing",
  maintenanceFeeLabel: "Missing",
  maintenanceFeeValue: "Missing",
  parkingPriceLabel: "Missing",
  parkingPriceValue: "Missing",
  totalSuitesLabel: "Missing",
  totalSuitesValue: "Missing",
  parkingMaintenanceLabel: "Missing",
  parkingMaintenanceValue: "Missing",
};
export default KeyInformation;
