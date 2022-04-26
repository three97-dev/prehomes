import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import Image from "../basic/image/Image";
import Button from "../basic/button/Button";
import Dropdown from "../dropdown/Dropdown";
import ModalFloorPlan from "../modal-floor-plan/ModalFloorPlan";
import ModalForm from "../modal-form/ModalForm";
import ContactSalesFooter from "../contact-sales-footer/ContactSalesFooter";
import Paginator from "../paginator/Paginator";
import ModalFloorPlansFilter from "../modal-floor-plans-filter/ModalFloorPlansFilter";

import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./FloorPlans.css";

const ITEMS_PER_PAGE_MOBILE = 4;
const ITEMS_PER_PAGE_DESKTOP = 8;

const FloorPlans = ({ title, options, floors, projectData, isProject, className }) => {
  const [moreInfoModal, setMoreInfoModal] = useState(null);
  const [isSubmittedContactSales, setIsSubmittedContactSales] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadySubmittedFloorPlans, setAlreadySubmittedFloorPlans] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [typeSort, setTypeSort] = useState(options.sort[0]);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);

  const defaultFilters = {
    sizeFilter: options.sizes[0],
    bedsFilter: options.beds[0],
    bathsFilter: options.baths[0],
    availabilityFilter: options.availability[0],
  };

  const [filter, setFilter] = useState(defaultFilters);

  const isDesktop = useApplyAfterWidth(833);
  const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;

  const closeFilterModal = useCallback(() => {
    setIsModalFilterOpen(false);
  }, [setIsModalFilterOpen]);

  const onClear = useCallback(() => {
    setFilter(defaultFilters);
  }, [setFilter, defaultFilters]);

  const onApply = useCallback(
    values => {
      setFilter(values);
    },
    [setFilter]
  );

  useEffect(() => {
    setFilter(filter);
  }, [filter]);

  const closeModal = useCallback(() => {
    setMoreInfoModal(null);
    setIsSubmittedContactSales(false);
  }, [setMoreInfoModal, setIsSubmittedContactSales]);

  const availableFloors = floors
    ? floors.filter(floorPlan => {
        if (floorPlan.isAvailable) return true;
        else return false;
      })
    : [];

  const filteredFloors = useMemo(() => {
    const shownFloors = floors
      ? floors.filter(floorPlan => {
          if (filter.sizeFilter.value && filter.sizeFilter.value > floorPlan.squareFootage) {
            return false;
          }
          if (filter.bedsFilter.value && filter.bedsFilter.value > floorPlan.bedrooms) {
            return false;
          }
          if (filter.bathsFilter.value && filter.bathsFilter.value > floorPlan.bathrooms) {
            return false;
          }
          if (filter.availabilityFilter.value && filter.availabilityFilter.value > floorPlan.isAvailable) {
            return false;
          }

          return true;
        })
      : [];
    return shownFloors;
  }, [floors, filter]);

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
    <div className={`relative prehomes-container ${className}`}>
      <div className="pl-25px lg:pl-0px">
        <h2 className="heading mb-16px">{title}</h2>
        <div className="flex flex-col md:flex-row mb-32px md:mb-0px">
          <h3 className="second-level-heading mb-8px md:mb-0px md:mr-64px">Total Floor Plans:</h3>
          <p className="second-level-heading second-level-heading-modifier">
            <span>{floors ? floors.length : 0}</span> ({availableFloors.length} Available)
          </p>
        </div>
      </div>
      <div className={`table-filters flex justify-between items-center md:hidden h-44px pl-35px pr-22px mb:mb-25px`}>
        <button
          onClick={() => {
            setIsModalFilterOpen(!isModalFilterOpen);
          }}
          className="w-80px h-24px text-deep-purple text-16px font-medium uppercase"
        >
          Filters
        </button>
        <ModalFloorPlansFilter
          onApply={onApply}
          onClear={onClear}
          onClose={closeFilterModal}
          title="Filters"
          clearButtonLabel="Clear"
          applyButtonLabel="Apply"
          sizeFilterTitle="Size"
          bedsFilterTitle="Beds"
          bathsFilterTitle="Baths"
          availabilityFilterTitle="Availability"
          modalIsOpen={isModalFilterOpen}
          filter={filter}
        />
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
      <div className="drop-down-grid pl-25px lg:pl-0px mt-32px">
        <Dropdown
          title="Size"
          options={options.sizes}
          value={filter.sizeFilter}
          onChange={value => setFilter({ ...filter, sizeFilter: value })}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title="Beds"
          options={options.beds}
          value={filter.bedsFilter}
          onChange={value => setFilter({ ...filter, bedsFilter: value })}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title="Baths"
          options={options.baths}
          value={filter.bathsFilter}
          onChange={value => setFilter({ ...filter, bathsFilter: value })}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
        <Dropdown
          title="Availability"
          options={options.availability}
          value={filter.availabilityFilter}
          onChange={value => setFilter({ ...filter, availabilityFilter: value })}
          arrowColor="#212121"
          containerClassName="floor-plans-dropdown-shadow"
        />
      </div>
      {sortedTiles.length === 0 ? (
        <h3 className="w-full pt-100px pb-50px text-center">No results</h3>
      ) : (
        <div className="md:mt-32px">
          <table className="w-full">
            {isDesktop && (
              <thead>
                <tr className="table-head">
                  <th></th>
                  <th className="table-head-item pl-32px py-16px text-deep-purple min-w-136px">
                    <h4 className="text-16px font-bold">Suite Name</h4>
                  </th>
                  <th className="table-head-item pl-32px py-16px text-deep-purple">
                    <h4 className="text-16px font-bold">Suite Type</h4>
                  </th>
                  <th className="table-head-item pl-32px py-16px text-deep-purple">
                    <h4 className="text-16px font-bold">Size</h4>
                  </th>
                  <th className="table-head-item pl-32px py-16px text-deep-purple">
                    <h4 className="text-16px font-bold">Price</h4>
                  </th>
                  <th className="table-head-item"></th>
                </tr>
              </thead>
            )}
            <div className="w-full md:mt-20px mt-28px"></div>
            <tbody>
              {isDesktop
                ? sortedTiles.map((floorPlan, index) => (
                    <tr key={index} className="table-info">
                      <td className="max-w-160px w-90px md:w-130px lg:w-160px">
                        <Image
                          width="160px"
                          height="120px"
                          image={floorPlan.floorPlanImage}
                          imgStyle={{ objectFit: `contain` }}
                          className="w-90px md:w-130px lg:w-160px max-w-160px h-120px"
                        />
                      </td>
                      <td className="pl-20px lg:pl-37px lg+:pl-30px">
                        <p className="text-mild-black font-normal text-16px max-w-154px">{floorPlan.name}</p>
                      </td>
                      <td className=" pl-20px lg:pl-37px">
                        <p className="text-mild-black font-normal text-16px mb-20px w-110px lg+:mb-12px lg+:mr-20px">
                          {floorPlan.bedrooms} Bedroom
                        </p>
                        <p className="text-mild-black font-normal text-16px w-110px">{floorPlan.bathrooms} Bathroom</p>
                      </td>
                      <td className="pl-20px lg:pl-37px">
                        <p className="text-mild-black font-normal text-16px">
                          {floorPlan.squareFootage ? floorPlan.squareFootage.toLocaleString("en-US") : ""} sq.ft
                        </p>
                      </td>
                      <td className="pl-20px lg:pl-44px lg+:mt-71px">
                        <p
                          className={`text-mild-black font-normal text-16px ${
                            floorPlan.price && "mb-20px"
                          } lg+:mb-12px lg+:mr-20px`}
                        >
                          {floorPlan.price ? `\$${floorPlan.price.toLocaleString("en-US")}` : "Please contact"}
                        </p>
                        <p className="text-mild-black font-normal text-16px">
                          {floorPlan.fields.pricePerSquareFoot
                            ? `\$${floorPlan.fields.pricePerSquareFoot.toLocaleString("en-US")} /sq.ft`
                            : ""}
                        </p>
                      </td>
                      <td className="pl-25px lg:pl-64px pr-5px lg:pr-0px">
                        <Button
                          variants="primary"
                          btnClasses="rounded-100px w-110px h-52px"
                          onClick={() => setMoreInfoModal(floorPlan)}
                        >
                          <div className="font-medium font-poppins text-16px">More info</div>
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
                          imgStyle={{ objectFit: `contain` }}
                          className="w-100px h-96px md:w-130px lg:w-full max-w-160px"
                        />
                      </td>
                      <td className="pl-20px lg:pl-37px lg+:pl-30px">
                        <div className="table-data flex flex-col justify-center">
                          <div className="text-16px font-bold mb-8px">{floorPlan.name.toUpperCase()}</div>
                          <div className="floor-info">
                            <p className="font-normal text-16px text-deep-purple w-100px">
                              {floorPlan.price ? `\$${floorPlan.price.toLocaleString("en-US")}` : "Please contact"}
                            </p>
                            <p className="font-normal text-16px text-deep-purple w-100px">
                              {floorPlan.squareFootage ? floorPlan.squareFootage.toLocaleString("en-US") : ""} Sq.Ft
                            </p>
                            <p className="w-100px font-normal text-16px text-deep-purple">
                              {floorPlan.bathrooms} Bathroom
                            </p>
                            <p className="w-100px font-normal text-16px text-deep-purple">
                              {floorPlan.bedrooms} Bedroom
                            </p>
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
                  floorPlan={moreInfoModal}
                  modalIsOpen={moreInfoModal ? true : false}
                  onClose={closeModal}
                />
              )}
              {isDesktop && (
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
            <tr className="divider hidden md:block"></tr>
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
