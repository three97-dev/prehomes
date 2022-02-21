import React from "react";
import PropTypes from "prop-types";
import UniversalLink from "../../utils/UniversalLink";

import "./InformationPanel.css";

const InformationPanel = ({
  title,
  googleDriveLinkLabel,
  googleDriveLinkValue,
  salesCentreEmailLabel,
  salesCentreEmailValue,
  salesCentrePhoneLabel,
  salesCentrePhoneValue,
  cooperatingCommissionLabel,
  cooperatingCommissionValue,
  showFullInfoPanel,
  className,
}) => {
  return (
    <div className={`w-full px-25px md+:px-20px lg:px-120px md:pt-94px mb-40px lg:mb-0px ${className}`}>
      <h2>{title}</h2>
      <div className="grid grid-cols-1 md+:grid-cols-2 gap-x-84px">
        <div>
          <h3 className="text-dark-creamy mt-50px mb-23px">{googleDriveLinkLabel}</h3>
          <UniversalLink link={googleDriveLinkValue}>
            <p className="information-panel-value">{googleDriveLinkValue}</p>
          </UniversalLink>
        </div>
        {showFullInfoPanel ? (
          <div>
            {salesCentreEmailValue ? (
              <>
                <h3 className="text-dark-creamy mt-50px mb-23px">{salesCentreEmailLabel}</h3>
                <p className="information-panel-value">{salesCentreEmailValue}</p>
              </>
            ) : null}
            {salesCentrePhoneValue ? (
              <>
                <h3 className="text-dark-creamy mt-40px mb-23px">{salesCentrePhoneLabel}</h3>
                <p className="information-panel-value">{salesCentrePhoneValue}</p>
              </>
            ) : null}
            {cooperatingCommissionValue ? (
              <>
                <h3 className="text-dark-creamy mt-40px mb-23px">{cooperatingCommissionLabel}</h3>
                <p className="information-panel-value">{cooperatingCommissionValue}</p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="hidden md+:block border-t border-gray-border mt-20px md:mt-37px"></div>
    </div>
  );
};

InformationPanel.propTypes = {
  title: PropTypes.string,
  googleDriveLinkLabel: PropTypes.string,
  googleDriveLinkValue: PropTypes.string,
  salesCentreEmailLabel: PropTypes.string,
  salesCentreEmailValue: PropTypes.string,
  salesCentrePhoneLabel: PropTypes.string,
  salesCentrePhoneValue: PropTypes.string,
  cooperatingCommissionLabel: PropTypes.string,
  cooperatingCommissionValue: PropTypes.string,
  className: PropTypes.string,
};

InformationPanel.defaultProps = {
  title: "",
  googleDriveLinkLabel: "",
  googleDriveLinkValue: "",
  salesCentreEmailLabel: "",
  salesCentreEmailValue: "",
  salesCentrePhoneLabel: "",
  salesCentrePhoneValue: "",
  cooperatingCommissionLabel: "",
  cooperatingCommissionValue: "",
  className: "",
};

export default InformationPanel;
