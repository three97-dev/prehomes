import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

import Dropdown from "../../components/dropdown/Dropdown";

import { options } from "../../utils/filterOptions";

import "./ModalFloorPlansFilter.css";

const ModalFloorPlansFilter = ({
  onApply,
  onClear,
  onClose,
  title,
  clearButtonLabel,
  applyButtonLabel,
  sizeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  availabilityFilterTitle,
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
      className="modal-floor-plans-filter"
      overlayClassName="modal-floor-plans-filter-overlay"
    >
      <button onClick={() => onClose()} className="modal-floor-plans-filter-close-button" />
      <div className="modal-floor-plans-filter-container">
        <div className="modal-floor-plans-filter-content items-stretch">
          <div className="grid grid-cols-2 justify-items-center gap-19px content-start">
            <h4 className="col-span-full mb-16px text-black-gray">{title}</h4>
            <Dropdown
              title={sizeFilterTitle}
              options={options.sizes}
              value={currentFilter.sizeFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, sizeFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
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
              title={availabilityFilterTitle}
              options={options.availability}
              value={currentFilter.availabilityFilter}
              onChange={value => setCurrentFilter({ ...currentFilter, availabilityFilter: value })}
              arrowColor="#212121"
              containerClassName="w-full"
              font="Poppins"
              fontSize="11px"
              fontStyle="italic"
              titleClassName="field-labels-font mb-10px"
            />
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-19px mt-20px self-end text-white button-font pb-50px">
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="flex items-center justify-center w-full bg-black h-54px rounded-15px font-medium"
            >
              {clearButtonLabel}
            </button>
            <button
              onClick={() => {
                onApply({ ...currentFilter });
                onClose();
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

ModalFloorPlansFilter.propTypes = {
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  clearButtonLabel: PropTypes.string,
  applyButtonLabel: PropTypes.string,
  sizeFilterTitle: PropTypes.string,
  bedsFilterTitle: PropTypes.string,
  bathsFilterTitle: PropTypes.string,
  availabilityFilterTitle: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  options: PropTypes.object,
  filter: PropTypes.object,
};

ModalFloorPlansFilter.defaultProps = {
  title: "",
  clearButtonLabel: "",
  applyButtonLabel: "",
  sizeFilterTitle: "",
  bedsFilterTitle: "",
  bathsFilterTitle: "",
  availabilityFilterTitle: "",
  modalIsOpen: false,
};

export default ModalFloorPlansFilter;
