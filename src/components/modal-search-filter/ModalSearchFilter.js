import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import Dropdown from "../../components/dropdown/Dropdown";
import FilterInput from "../../components/filter-input/FilterInput";

import { options } from "../../utils/filterOptions";

import "./ModalSearchFilter.css";

const ModalSearchFilter = ({
  onApply,
  onClear,
  onClose,
  title,
  clearButtonLabel,
  applyButtonLabel,
  typeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  minPriceFilterTitle,
  maxPriceFilterTitle,
  minSizeFilterTitle,
  maxSizeFilterTitle,
  modalIsOpen,
  filter,
}) => {
  const [currentFilter, setCurrentFilter] = useState({ ...filter });

  useEffect(() => {
    setCurrentFilter(filter);
  }, [filter]);

  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      onRequestClose={() => onClose()}
      className="modal-search-filter"
      overlayClassName="modal-search-filter-overlay"
    >
      <button onClick={() => onClose()} className="modal-search-filter-close-button" />
      <div className="modal-search-filter-container">
        <div className="modal-search-filter-content items-stretch">
          <div className="grid grid-cols-2 justify-items-center gap-19px content-start">
            <h4 className="col-span-full text-black-gray">
              {title}
            </h4>
            <Dropdown
              title={typeFilterTitle}
              options={options.types}
              value={currentFilter.typeFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, typeFilter: value })}
              arrowColor="#212121"
              containerClassName="col-span-full w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
            <Dropdown
              title={bedsFilterTitle}
              options={options.beds}
              value={currentFilter.bedsFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, bedsFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
            <Dropdown
              title={bathsFilterTitle}
              options={options.baths}
              value={currentFilter.bathsFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, bathsFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
            <Dropdown
              title={minPriceFilterTitle}
              options={options.minPrice}
              value={currentFilter.minPriceFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, minPriceFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
            <Dropdown
              title={maxPriceFilterTitle}
              options={options.maxPrice}
              value={currentFilter.maxPriceFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, maxPriceFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
            <FilterInput
              title={minSizeFilterTitle}
              placeholder={"No Min"}
              value={currentFilter.minSizeFilter}
              onChange={event => setCurrentFilter({ ...currentFilter, minSizeFilter: event.target.value })}
              className="w-full"
              inputClassName="placeholder-font"
              titleClassName="field-labels-font mb-10px"
            />
            <FilterInput
              title={maxSizeFilterTitle}
              placeholder={"No Max"}
              value={currentFilter.maxSizeFilter}
              onChange={event => setCurrentFilter({ ...currentFilter, maxSizeFilter: event.target.value })}
              className="w-full"
              inputClassName="placeholder-font"
              titleClassName="field-labels-font mb-10px"
            />
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-19px mt-20px self-end text-white button-font pb-50px">
            <button
              onClick={() => onClear()}
              className="flex items-center justify-center w-full bg-black h-54px rounded-15px font-medium"
            >
              {clearButtonLabel}
            </button>
            <button
              onClick={() => {
                onApply({ ...currentFilter });
              }}
              className="flex items-center justify-center w-full bg-dark-orange h-54px rounded-15px font-medium"
            >
              {applyButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalSearchFilter.propTypes = {
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  clearButtonLabel: PropTypes.string,
  applyButtonLabel: PropTypes.string,
  typeFilterTitle: PropTypes.string,
  bedsFilterTitle: PropTypes.string,
  bathsFilterTitle: PropTypes.string,
  minPriceFilterTitle: PropTypes.string,
  maxPriceFilterTitle: PropTypes.string,
  minSizeFilterTitle: PropTypes.string,
  maxSizeFilterTitle: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  options: PropTypes.object,
  filter: PropTypes.object,
};

ModalSearchFilter.defaultProps = {
  title: "",
  clearButtonLabel: "",
  applyButtonLabel: "",
  modalIsOpen: false,
  typeFilterTitle: "",
  bedsFilterTitle: "",
  bathsFilterTitle: "",
  minPriceFilterTitle: "",
  maxPriceFilterTitle: "",
  minSizeFilterTitle: "",
  maxSizeFilterTitle: "",
};

export default ModalSearchFilter;
