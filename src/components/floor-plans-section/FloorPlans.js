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
  isProject,
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
  const [typeSort, setTypeSort] = useState(options.sort[0]);

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

  const sortedTiles = useMemo(() => {
    if (typeSort.value === "price-lo-hi") {
      return [...currentItems].sort((a, b) => a.price - b.price);
    }
    if (typeSort.value === "price-hi-lo") {
      return [...currentItems].sort((a, b) => b.price - a.price);
    }
    if (typeSort.value === "beds") {
      return [...currentItems].sort((a, b) => a.bedrooms - b.bedrooms);
    }
    if (typeSort.value === "baths") {
      return [...currentItems].sort((a, b) => a.bathrooms - b.bathrooms);
    }
    if (typeSort.value === "size") {
      return [...currentItems].sort((a, b) => a.squareFootage - b.squareFootage);
    }
    return currentItems;
  }, [typeSort, currentItems]);

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
    <div className={`relative pt-50px md:pt-30px bg-peach-colour md:bg-light-gray ${className}`}>
      {isDesktop && (
        <hr className="absolute left-0px top-330px md:top-294px w-full h-1px md:px-25px lg:px-120px border-none bg-black bg-clip-content" />
      )}
      <div className="pl-25px lg:pl-120px">
        <h2 className="text-29px md:text-32px leading-44px md:leading-50px font-poppins text-tundora md:text-black-gray font-bold mb-29px md:mb-20px">
          {title}
        </h2>
        <h3 className="text-22px md+:text-26px leading-26px md+:leading-30px font-late-november font-normal text-dark-orange mb-21px md:mb-43px">
          {subtitle}
        </h3>
        <p className="text-11px md:text-13px leading-24px md:leading-19px font-poppins mb-20px md:mb-40px">
          <span className="font-bold">{floors.length}</span> ({availableFloors.length} {available})
        </p>
      </div>
      <div
        className={`table-filters flex justify-between items-center md:hidden h-44px text-14px leading-24px font-metropolis pl-35px pr-22px mb-25px`}
      >
        <button className="w-80px h-24px text-dark-orange">Filters</button>
        <Dropdown
          options={options.sort}
          value={{
            value: typeSort.value,
            label: "Sort: " + typeSort.label,
          }}
          onChange={setTypeSort}
          arrowColor="#212121"
          titleClassName="hidden"
          containerClassName="w-160px floor-plans-dropdown-sort-shadow rounded-15px"
          height="34px"
          font="Metropolis"
          fontSize="11px"
        />
      </div>
      <div className="drop-down-grid absolute right-25px md+right-90px lg:right-120px top-136px">
        <Dropdown
          title={sizeFilterTitle}
          options={options.sizes}
          value={sizeFilter}
          onChange={setSizeFilter}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title={bedsFilterTitle}
          options={options.beds}
          value={bedsFilter}
          onChange={setBedsFilter}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title={bathsFilterTitle}
          options={options.baths}
          value={bathsFilter}
          onChange={setBathsFilter}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title={availabilityFilterTitle}
          options={options.availability}
          value={availabilityFilter}
          onChange={setAvailabilityFilter}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
      </div>
      {sortedTiles.length === 0 ? (
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
                  <th className="table-head-item pl-20px md:pl-16px lg:pl-37px text-black-gray min-w-136px">
                    {suiteNameColumnTitle}
                  </th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-40px text-black-gray">
                    {suiteTypeColumnTitle}
                  </th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-40px text-black-gray">{sizeColumnTitle}</th>
                  <th className="table-head-item pl-20px md:pl-22px lg:pl-48px text-black-gray">{priceColumnTitle}</th>
                  <th className="table-head-item"></th>
                </tr>
              </thead>
            )}
            <tbody className="">
              {isDesktop
                ? sortedTiles.map((floorPlan, index) => (
                    <tr key={index} className="table-info">
                      <td className="max-w-160px w-90px md:w-130px lg:w-160px">
                        <Image
                          width="160px"
                          height="120px"
                          image={floorPlan.floorPlanImage}
                          className="w-90px md:w-130px lg:w-160px max-w-160px h-120px"
                        />
                      </td>
                      <td className="text-16px leading-16px font-bold font-metropolis pl-20px lg:pl-37px lg+:pl-30px">
                        <div className="max-w-154px">{floorPlan.name}</div>
                      </td>
                      <td className="text-16px leading-16px font-light font-poppins text-black-gray pl-20px lg:pl-37px">
                        <p className="mb-20px w-110px lg+:mb-12px lg+:mr-20px">
                          {floorPlan.bedrooms} {suiteNameColumnBedroomLabel}
                        </p>
                        <p className="w-110px">
                          {floorPlan.bathrooms} {suiteNameColumnBathroomLabel}
                        </p>
                      </td>
                      <td className="text-16px leading-16px font-light font-poppins text-black-gray pl-20px lg:pl-37px">
                        {floorPlan.squareFootage.toLocaleString("en-US")} {sizeColumnUnits}
                      </td>
                      <td className="text-16px leading-16px font-light font-poppins text-black-gray pl-20px lg:pl-44px lg+:mt-71px">
                        <p className="mb-20px lg+:mb-12px lg+:mr-20px">${floorPlan.price.toLocaleString("en-US")}</p>
                        <p>
                          ${floorPlan.priceForSquareFootage.toLocaleString("en-US")} {priceColumnUnits}
                        </p>
                      </td>
                      <td className="pl-25px lg:pl-64px pr-5px lg:pr-0px">
                        <Button
                          variants="black_gradient"
                          btnClasses="w-113px h-54px"
                          onClick={() => setMoreInfoModal(floorPlan)}
                        >
                          <div className="text-16px leading-24px font-medium font-poppins">{moreInfoButtonLabel}</div>
                        </Button>
                      </td>
                    </tr>
                  ))
                : sortedTiles.map((floorPlan, index) => (
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
                            <div className="w-100px text-11px leading-11px font-metropolis text-black-gray">
                              {floorPlan.bathrooms} {suiteNameColumnBathroomLabel.toUpperCase()}
                            </div>
                            <div className="w-100px text-11px leading-11px font-metropolis text-black-gray">
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
                  projectName={moreInfoModal?.projectName || projectData?.projectName || ""}
                  projectContentfulId={moreInfoModal?.projectContentfulId || projectData?.contentful_id}
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
                  projectName={moreInfoModal?.projectName || projectData?.projectName || ""}
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
      {filteredFloors.length > itemsPerPage ? (
        <Paginator pageCount={pageCount} handlePageClick={handlePageClick} />
      ) : isProject ? null : (
        <div className="hidden md:block w-full h-113px"></div>
      )}
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
