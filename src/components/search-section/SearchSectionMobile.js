import React, { useState, useCallback } from "react";

import Dropdown from "../../components/dropdown/Dropdown";
import SmallTile from "../../components/small-tile/SmallTile";
import SearchMap from "../search-map/SearchMap";
import ModalSearchFilter from "../modal-search-filter/ModalSearchFilter";
import SearchInput from "../search-input/SearchInput";

import { options } from "../../utils/filterOptions";

import SearchIconMobile from "../../assets/search-grey.svg";

const SearchSectionMobile = ({
  onClear,
  onApply,
  onMapChange,
  onForceLocationChange,
  modalTitle,
  typeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  minPriceFilterTitle,
  maxPriceFilterTitle,
  minSizeFilterTitle,
  maxSizeFilterTitle,
  clearButtonLabel,
  applyButtonLabel,
  searchPlaceholder,
  noResultsLabel,
  resultsLabel,
  typeSort,
  setTypeSort,
  visibleTiles,
  filter,
  allProjects,
  filteredProjects,
  centerPosition,
  zoom,
  className,
}) => {
  const [isListMode, setIsListMode] = useState(true);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalFilterOpen(false);
  }, [setIsModalFilterOpen]);

  return (
    <div className={className}>
      <div>
        <div className="w-full border-b border-light-grey-2 pt-125px bg-light-gray"></div>
        <div className="relative h-45px w-full px-25px mt-14px mb-26px">
          <button className="absolute top-8px right-35px z-20 p-5px">
            <img src={SearchIconMobile} alt="search" />
          </button>
          <SearchInput searchPlaceholder={searchPlaceholder} onForceLocationChange={onForceLocationChange} />
        </div>
        <div className="w-full border-t border-b border-light-grey-2 px-25px flex justify-between">
          <button
            onClick={() => {
              setIsModalFilterOpen(!isModalFilterOpen);
            }}
            className="flex justify-center py-10px text-14px leading-24px font-poppins text-dark-green w-62px cursor-pointer"
          >
            Filters
          </button>
          <ModalSearchFilter
            onApply={onApply}
            onClear={onClear}
            onClose={closeModal}
            title={modalTitle}
            clearButtonLabel={clearButtonLabel}
            applyButtonLabel={applyButtonLabel}
            typeFilterTitle={typeFilterTitle}
            bedsFilterTitle={bedsFilterTitle}
            bathsFilterTitle={bathsFilterTitle}
            minPriceFilterTitle={minPriceFilterTitle}
            maxPriceFilterTitle={maxPriceFilterTitle}
            minSizeFilterTitle={minSizeFilterTitle}
            maxSizeFilterTitle={maxSizeFilterTitle}
            modalIsOpen={isModalFilterOpen}
            filter={filter}
          />
          <button
            onClick={() => setIsListMode(!isListMode)}
            className="flex justify-center py-10px text-14px leading-24px font-poppins w-84px cursor-pointer text-dark-green"
          >
            {isListMode ? "Map View" : "List View"}
          </button>
        </div>
      </div>
      <div className="relative">
        {isListMode ? (
          <div className="search-section-results-container-mobile w-full bg-light-gray">
            <div className="mx-auto max-w-619px px-25px">
              <div className={`text-29px leading-43px font-poppins text-tundora font-bold mb-7px pt-10px pl-10px`}>
                New Homes for Sale
              </div>
              <div className="flex justify-between items-center mb-17px">
                <span className="text-tundora text-11px leading-24px font-poppins font-bold pl-10px">
                  {visibleTiles.length} {resultsLabel}
                </span>
                <Dropdown
                  options={options.sort}
                  value={{
                    value: typeSort.value,
                    label: "Sort: " + typeSort.label,
                  }}
                  onChange={setTypeSort}
                  arrowColor="#212121"
                  titleClassName="hidden"
                  containerClassName="w-160px"
                  height="34px"
                  font="Metropolis"
                  fontSize="11px"
                />
              </div>
              <div className={`result-tiles-container`}>
                {visibleTiles.length === 0 ? (
                  <div className="w-full mt-100px mr-40px text-center text-14px leading-14px font-metropolis font-bold">
                    {noResultsLabel}
                  </div>
                ) : (
                  visibleTiles.map((item, i) => {
                    return (
                      <SmallTile
                        key={i}
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        location={item.city}
                        neighborhood={item.neighborhood}
                        price={item.prices[0]}
                        link={item.link}
                        className="mb-22px w-full search-section-tile-mobile"
                        imageClassName="w-full"
                        titleClassName="h-26px"
                        subtitleClassName="mb-0px normal-case"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : null}
        <div className="search-section-map-container-mobile w-full absolute top-0px -z-10">
          <SearchMap
            allProjects={allProjects}
            filteredProjects={filteredProjects}
            centerPosition={centerPosition}
            zoom={zoom}
            onMapChange={onMapChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSectionMobile;
