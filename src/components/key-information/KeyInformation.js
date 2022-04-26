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
    <div className={`grid bg-white-pink md:bg-transparent px-25px lg:px-0px ${className}`}>
      <h2 className="heading mb-16px">{title}</h2>
      <div className="key-info-grid-area-wrapper-mobile md:key-info-grid-area-wrapper">
        <div className="key-info-grid-status-area">
          <h3 className="second-level-heading">{statusLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">{statusValueToShow}</p>
        </div>
        <div className="key-info-grid-type-area">
          <h3 className="second-level-heading">{typeLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
            {typeValue?.map(type => type.name).join(", ")}
          </p>
        </div>
        <div className="key-info-grid-launch-date-area">
          <h3 className="second-level-heading">{launchDateLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
            {launchDateValue ? DateTime.fromISO(launchDateValue).toFormat("dd / LL / yyyy") : ""}
          </p>
        </div>
        <div className="key-info-grid-estimated-occupancy-area">
          <h3 className="second-level-heading">{estimatedOccupancyLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
            {estimatedOccupancyValue ? DateTime.fromISO(estimatedOccupancyValue).toFormat("dd / LL / yyyy") : ""}
          </p>
        </div>
        <div className="key-info-grid-maintenance-fee-area">
          <h3 className="second-level-heading">{maintenanceFeeLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
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
        <div className="key-info-grid-total-suites-area">
          <h3 className="second-level-heading">{totalSuitesLabel}:</h3>
          <p className="mt-14px">
            {totalSuitesValue ? (
              <Markdown
                data={totalSuitesValue}
                config={{
                  p: "text-mild-black font-light text-16px mb-16px",
                }}
              />
            ) : null}
          </p>
        </div>
        <div className="key-info-grid-major-intersection-area">
          <h3 className="second-level-heading">{majorIntersectionLabel}:</h3>
          <div className="mt-14px">
            {majorIntersectionValue ? (
              <Markdown
                data={majorIntersectionValue}
                config={{
                  p: "text-mild-black font-light mt-20px text-16px  mb-16px",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-architects-area">
          <h3 className="second-level-heading">{architectsLabel}:</h3>
          <div className="mt-14px">
            {architectsValue ? (
              <Markdown
                data={architectsValue}
                config={{
                  p: "key-information-text text-16px mb-16px",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-deposit-amount-area">
          <h3 className="second-level-heading">{depositAmountLabel}:</h3>
          <div className="mt-14px">
            {depositAmountValue ? (
              <Markdown
                data={depositAmountValue}
                config={{
                  p: "text-mild-black font-light text-16px mb-16px",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-deposit-structure-area">
          <h3 className="second-level-heading">{depositStructureLabel}:</h3>
          <div className="mt-14px">
            {depositStructureValue ? (
              <Markdown
                data={depositStructureValue}
                config={{
                  p: "text-mild-black font-light text-16px mb-16px",
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="key-info-grid-locker-price-area">
          <h3 className="second-level-heading">{lockerPriceLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
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
          <h3 className="second-level-heading">{lockerMaintenanceLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
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
        <div className="key-info-grid-parking-price-area">
          <h3 className="second-level-heading">{parkingPriceLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
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
        <div className="key-info-grid-parking-maintenance-area">
          <h3 className="second-level-heading">{parkingMaintenanceLabel}:</h3>
          <p className="text-mild-black font-light text-16px mt-14px mb-16px">
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
