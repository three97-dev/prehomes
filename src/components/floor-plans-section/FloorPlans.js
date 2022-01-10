import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";
import Button from "../basic/button/Button";
import Dropdown from "../dropdown/Dropdown";
import ModalFloorPlan from "../modal-floor-plan/ModalFloorPlan";
import ModalForm from "../modal-form/ModalForm";
import ContactSalesFooter from "../contact-sales-footer/ContactSalesFooter";
import Paginator from "../paginator/Paginator";

import { useIsDesktop } from "../../utils/useApplyAfterWidth";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./FloorPlans.css";

const ITEMS_PER_PAGE_MOBILE = 4;
const ITEMS_PER_PAGE_DESKTOP = 8;

const FloorPlans = ({
  title,
  subtitle,
  available,
  sizeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  availabilityFilterTitle,
  floorNoResults,
  suiteNameColumnTitle,
  suiteTypeColumnTitle,
  sizeColumnTitle,
  priceColumnTitle,
  suiteNameColumnBedroomLabel,
  suiteNameColumnBathroomLabel,
  sizeColumnUnits,
  priceColumnUnits,
  moreInfoButtonLabel,
  options,
  floors,
  projectData,
  projectNameLabel,
  suiteNameLabel,
  squareFootageLabel,
  bedroomsLabel,
  bathroomsLabel,
  modalProjectPrice,
  saveFloorPlanButtonLabel,
  requestInfoButtonLabel,
  className,
}) => {
  const [sizeFilter, setSizeFilter] = useState(options.sizes[0]);
  const [bedsFilter, setBedsFilter] = useState(options.beds[0]);
  const [bathsFilter, setBathsFilter] = useState(options.baths[0]);
  const [availabilityFilter, setAvailabilityFilter] = useState(options.availability[0]);
  const [moreInfoModal, setMoreInfoModal] = useState(null);
  const [isSubmittedContactSales, setIsSubmittedContactSales] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySubmittedFloorPlans, setAlreadySubmittedFloorPlans] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);

  const isBiggerDesktop = useApplyAfterWidth(833);
  const isDesktop = useIsDesktop();
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;

  const closeModal = useCallback(() => {
    setMoreInfoModal(null);
    setIsSubmittedContactSales(false);
  }, [setMoreInfoModal, setIsSubmittedContactSales]);

  const availableFloors = floors.filter(floorPlan => {
    if (floorPlan.isAvailable) return true;
    else return false;
  });

  const filteredFloors = useMemo(() => {
    const shownFloors = floors.filter(floorPlan => {
      if (sizeFilter.value && sizeFilter.value > floorPlan.squareFootage) return false;
      if (bedsFilter.value && bedsFilter.value > floorPlan.bedrooms) return false;
      if (bathsFilter.value && bathsFilter.value > floorPlan.bathrooms) return false;
      if (availabilityFilter.value && availabilityFilter.value > floorPlan.isAvailable) return false;

      return true;
    });
    return shownFloors;
  }, [floors, sizeFilter, bedsFilter, bathsFilter, availabilityFilter]);

  const currentItems = useMemo(() => {
    const newCurrentItems = filteredFloors.slice(pageOffset, pageOffset + itemsPerPage);
    return newCurrentItems;
  }, [filteredFloors, itemsPerPage, pageOffset]);

  const pageCount = useMemo(() => {
    const newPageCount = Math.ceil(filteredFloors.length / itemsPerPage);
    return newPageCount;
  }, [filteredFloors, itemsPerPage]);

  const handlePageClick = useCallback(
    event => {
      const newOffset = (event.selected * itemsPerPage) % filteredFloors.length;
      setPageOffset(newOffset);
    },
    [itemsPerPage, setPageOffset]
  );

  return (
    <div className={`relative pt-50px md:pt-19px bg-peach-colour md:bg-white ${className}`}>
      {isDesktop && (
        <hr className="absolute left-0px top-312px md:top-222px w-full h-1px md:px-25px lg:px-120px border-none bg-black bg-clip-content" />
      )}
      <div className="pl-25px lg:pl-120px">
        <h2 className="text-29px leading-29px font-bold font-metropolis text-tundora mb-29px md:mb-19px">{title}</h2>
        <h3 className="text-22px leading-22px font-bold font-metropolis text-dark-orange mb-21px">{subtitle}</h3>
        <p className="text-16px leading-16px font-metropolis mb-20px md:mb-40px">
          <span className="font-bold">{floors.length}</span> ({availableFloors.length} {available.toUpperCase()})
        </p>
      </div>
      <div
        className={`table-filters block md:hidden h-44px text-14px leading-24px font-metropolis pl-35px pt-10px mb-25px`}
      >
        <button className="w-80px h-24px">Filters</button>
      </div>
      <div className="drop-down-grid absolute right-25px md+right-90px lg:right-120px top-77px">
        <Dropdown
          title={sizeFilterTitle}
          options={options.sizes}
          value={sizeFilter}
          onChange={setSizeFilter}
          arrowColor="#212121"
        />
        <Dropdown
          title={bedsFilterTitle}
          options={options.beds}
          value={bedsFilter}
          onChange={setBedsFilter}
          arrowColor="#212121"
        />
        <Dropdown
          title={bathsFilterTitle}
          options={options.baths}
          value={bathsFilter}
          onChange={setBathsFilter}
          arrowColor="#212121"
        />
        <Dropdown
          title={availabilityFilterTitle}
          options={options.availability}
          value={availabilityFilter}
          onChange={setAvailabilityFilter}
          arrowColor="#212121"
        />
      </div>
      {currentItems.length === 0 ? (
        <div className="w-full pt-100px pb-50px text-center text-14px leading-14px font-metropolis font-bold">
          {floorNoResults}
        </div>
      ) : (
        <div className="md:px-25px lg:px-120px">
          <table className="w-full">
            {isDesktop && (
              <thead>
                <tr className="table-head">
                  <th className=""></th>
                  <th className="table-head-item pl-20px md:pl-20px lg:pl-37px">
                    {suiteNameColumnTitle.toUpperCase()}
                  </th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-40px">
                    {suiteTypeColumnTitle.toUpperCase()}
                  </th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-40px">{sizeColumnTitle.toUpperCase()}</th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-48px">{priceColumnTitle.toUpperCase()}</th>
                  <th className="table-head-item"></th>
                </tr>
              </thead>
            )}
            <tbody className="">
              {isDesktop
                ? currentItems.map((floorPlan, index) => (
                    <tr key={index} className="table-info">
                      <td className="max-w-200px">
                        <Image
                          width="160px"
                          height="120px"
                          image={floorPlan.floorPlanImage}
                          className="w-90px md:w-130px lg:w-full max-w-160px"
                        />
                      </td>
                      <td className="text-16px leading-16px font-bold font-metropolis pl-20px lg:pl-37px lg+:pl-30px">
                        <div className="max-w-154px">{floorPlan.name.toUpperCase()}</div>
                      </td>
                      <td className="text-16px leading-16px font-metropolis pl-20px lg:pl-37px lg+:pl-0px">
                        <p className="mb-20px w-110px lg+:mb-0px lg+:mr-20px">
                          {floorPlan.bedrooms} {suiteNameColumnBedroomLabel.toUpperCase()}
                        </p>
                        <p className="w-110px">
                          {floorPlan.bathrooms} {suiteNameColumnBathroomLabel.toUpperCase()}
                        </p>
                      </td>
                      <td className="text-16px leading-16px font-metropolis pl-20px lg:pl-37px">
                        {floorPlan.squareFootage.toLocaleString("en-US")} {sizeColumnUnits.toUpperCase()}
                      </td>
                      <td className="text-16px leading-16px font-metropolis pl-20px lg:pl-44px lg+:pl-0px lg+:mt-71px">
                        <p className="mb-20px lg+:mb-0px lg+:mr-20px">${floorPlan.price.toLocaleString("en-US")}</p>
                        <p>
                          ${floorPlan.priceForSquareFootage.toLocaleString("en-US")} {priceColumnUnits.toUpperCase()}
                        </p>
                      </td>
                      <td className="pl-25px lg:pl-64px pr-5px lg:pr-0px">
                        <Button
                          variants="black_gradient"
                          btnClasses="w-113px h-54px"
                          onClick={() => setMoreInfoModal(floorPlan)}
                        >
                          <div className="text-14px leading-17px font-bold font-rosario">{moreInfoButtonLabel}</div>
                        </Button>
                      </td>
                    </tr>
                  ))
                : currentItems.map((floorPlan, index) => (
                    <tr key={index} className="table-info" onClick={() => setMoreInfoModal(floorPlan)}>
                      <td className="h-120px pl-25px">
                        <Image
                          width="100px"
                          height="96px"
                          image={floorPlan.floorPlanImage}
                          className="w-100px h-96px md:w-130px lg:w-full max-w-160px"
                        />
                      </td>
                      <td className="pl-20px lg:pl-37px lg+:pl-30px">
                        <div className="table-data">
                          <div className="text-14px leading-14px font-bold font-metropolis mb-20px">
                            {floorPlan.name.toUpperCase()}
                          </div>
                          <div className="floor-info">
                            <div className="w-100px text-11px leading-11px font-bold font-metropolis">
                              ${floorPlan.price.toLocaleString("en-US")}
                            </div>
                            <div className="w-100px text-11px leading-11px font-bold font-metropolis">
                              {floorPlan.squareFootage.toLocaleString("en-US")} {sizeColumnUnits.toUpperCase()}
                            </div>
                            <div className="w-100px text-11px leading-11px font-metropolis">
                              {floorPlan.bathrooms} {suiteNameColumnBathroomLabel.toUpperCase()}
                            </div>
                            <div className="w-100px text-11px leading-11px font-metropolis">
                              {floorPlan.bedrooms} {suiteNameColumnBedroomLabel.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              {isSubmittedContactSales ? (
                <ModalForm
                  modalIsOpen={isSubmittedContactSales ? true : false}
                  onClose={closeModal}
                  isSubmissionSuccessful={isSubmitted ? true : false}
                />
              ) : (
                <ModalFloorPlan
                  projectData={projectData}
                  projectNameLabel={projectNameLabel}
                  suiteNameLabel={suiteNameLabel}
                  squareFootageLabel={squareFootageLabel}
                  bedroomsLabel={bedroomsLabel}
                  bathroomsLabel={bathroomsLabel}
                  modalProjectPrice={modalProjectPrice}
                  saveFloorPlanButtonLabel={saveFloorPlanButtonLabel}
                  requestInfoButtonLabel={requestInfoButtonLabel}
                  sizeColumnUnits={sizeColumnUnits}
                  floorPlan={moreInfoModal}
                  modalIsOpen={moreInfoModal ? true : false}
                  onClose={closeModal}
                />
              )}
              {isBiggerDesktop && (
                <ContactSalesFooter
                  projectName={projectData.projectName}
                  floorPlanName={moreInfoModal?.name}
                  contactSalesIsOpen={moreInfoModal ? true : false}
                  isFormDisabled={alreadySubmittedFloorPlans.includes(moreInfoModal?.contentful_id)}
                  onSubmit={() => {
                    setIsSubmittedContactSales(true);
                    setIsSubmitted(true);
                    setAlreadySubmittedFloorPlans([...alreadySubmittedFloorPlans, moreInfoModal.contentful_id]);
                  }}
                  onSubmitWithError={() => {
                    setIsSubmittedContactSales(true);
                    setIsSubmitted(false);
                  }}
                />
              )}
            </tbody>
          </table>
        </div>
      )}
      {filteredFloors.length > itemsPerPage && <Paginator pageCount={pageCount} handlePageClick={handlePageClick} />}
    </div>
  );
};

export default FloorPlans;

FloorPlans.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  available: PropTypes.string,
  sizeFilterTitle: PropTypes.string,
  bedsFilterTitle: PropTypes.string,
  bathsFilterTitle: PropTypes.string,
  availabilityFilterTitle: PropTypes.string,
  floorNoResults: PropTypes.string,
  suiteNameColumnTitle: PropTypes.string,
  suiteTypeColumnTitle: PropTypes.string,
  sizeColumnTitle: PropTypes.string,
  priceColumnTitle: PropTypes.string,
  suiteNameColumnBedroomLabel: PropTypes.string,
  suiteNameColumnBathroomLabel: PropTypes.string,
  sizeColumnUnits: PropTypes.string,
  priceColumnUnits: PropTypes.string,
  moreInfoButtonLabel: PropTypes.string,
  options: PropTypes.object,
  floors: PropTypes.array,
  className: PropTypes.string,
};

FloorPlans.defaultProps = {
  title: "",
  subtitle: "",
  available: "",
  sizeFilterTitle: "",
  bedsFilterTitle: "",
  bathsFilterTitle: "",
  availabilityFilterTitle: "",
  floorNoResults: "",
  suiteNameColumnTitle: "",
  suiteTypeColumnTitle: "",
  sizeColumnTitle: "",
  priceColumnTitle: "",
  suiteNameColumnBedroomLabel: "",
  suiteNameColumnBathroomLabel: "",
  sizeColumnUnits: "",
  priceColumnUnits: "",
  moreInfoButtonLabel: "",
  options: {},
  floors: [],
  className: "",
};
