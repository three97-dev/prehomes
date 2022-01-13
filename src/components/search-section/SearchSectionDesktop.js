import React, { useState } from "react";

import DropdownSort from "../dropdown-sort/DropdownSort";
import FilterInput from "../../components/filter-input/FilterInput";
import SearchTile from "../../components/search-tile/SearchTile";
import SearchInput from "../search-input/SearchInput";
import Dropdown from "../../components/dropdown/Dropdown";
import SearchMap from "../search-map/SearchMap";

import { options } from "../../utils/filterOptions";

import SearchIcon from "../../assets/search.svg";
import FilterWhiteIcon from "../../assets/button/filter-white.svg";
import FilterGoldIcon from "../../assets/button/filter-gold.svg";
import SquaresWhiteIcon from "../../assets/button/squares-white.svg";
import SquaresGoldIcon from "../../assets/button/squares-gold.svg";

import "./SearchSectionDesktop.css";

const SearchSectionDesktop = ({
  onMapChange,
  onForceLocationChange,
  allProjects,
  filter,
  setFilter,
  visibleTiles,
  typeSort,
  setTypeSort,
  filteredProjects,
  centerPosition,
  zoom,
  searchPlaceholder,
  typeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  minPriceFilterTitle,
  maxPriceFilterTitle,
  minSizeFilterTitle,
  maxSizeFilterTitle,
  resultsLabel,
  noResultsLabel,
  className,
}) => {
  const [isListMode, setIsListMode] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      <div className={`${isListMode ? "search-section-list-mode" : "search-section"} ${className}`}>
        <div
          className={`search-container ${isListMode ? "grid-list-mode" : "grid-regular"} ${
            isFiltersOpen ? "gap-y-10px" : "gap-y-0"
          }`}
        >
          <div className="search-bar">
            <button className="absolute top-38px left-10px z-20">
              <img src={SearchIcon} alt="search" />
            </button>
            <SearchInput searchPlaceholder={searchPlaceholder} onForceLocationChange={onForceLocationChange} />
            <label className="relative inline-block w-57px h-45px select-none">
              <input
                type="checkbox"
                onChange={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-0px h-0px opacity-0"
              />
              <span
                className={`absolute w-full h-full cursor-pointer rounded-15px ${
                  isFiltersOpen ? "bg-dark-orange search-section-switch-inner-shadow" : "bg-white search-section-shadow-border"
                }`}
              >
                <img src={isFiltersOpen ? FilterWhiteIcon : FilterGoldIcon} alt="filter" className="switch-image" />
              </span>
            </label>
          </div>
          {isFiltersOpen ? (
            <>
              <Dropdown
                title={typeFilterTitle}
                options={options.types}
                value={filter.typeFilter}
                onChange={value => setFilter({ ...filter, typeFilter: value })}
                arrowColor="#212121"
                containerClassName="type-select"
              />
              <Dropdown
                title={bedsFilterTitle}
                options={options.beds}
                value={filter.bedsFilter}
                onChange={value => setFilter({ ...filter, bedsFilter: value })}
                arrowColor="#212121"
                containerClassName="beds-select"
              />
              <Dropdown
                title={bathsFilterTitle}
                options={options.baths}
                value={filter.bathsFilter}
                onChange={value => setFilter({ ...filter, bathsFilter: value })}
                arrowColor="#212121"
                containerClassName="baths-select"
              />
              <Dropdown
                title={minPriceFilterTitle}
                options={options.minPrice}
                value={filter.minPriceFilter}
                onChange={value => setFilter({ ...filter, minPriceFilter: value })}
                arrowColor="#212121"
                containerClassName="min-price-select"
              />
              <Dropdown
                title={maxPriceFilterTitle}
                options={options.maxPrice}
                value={filter.maxPriceFilter}
                onChange={value => setFilter({ ...filter, maxPriceFilter: value })}
                arrowColor="#212121"
                containerClassName="max-price-select"
              />
              <FilterInput
                title={minSizeFilterTitle}
                placeholder={"No Min"}
                value={filter.minSizeFilter}
                onChange={event => setFilter({ ...filter, minSizeFilter: event.target.value })}
                className="min-size-select"
              />
              <FilterInput
                title={maxSizeFilterTitle}
                placeholder={"No Max"}
                value={filter.maxSizeFilter}
                onChange={event => setFilter({ ...filter, maxSizeFilter: event.target.value })}
                className="max-size-select"
              />
            </>
          ) : null}
        </div>
        <div className="result-container">
          <div className="result-controls">
            <span className="text-13px leading-14px font-poppins font-bold text-tundora">
              {visibleTiles.length} {resultsLabel}
            </span>
            <DropdownSort options={options.sort} value={typeSort} onChange={setTypeSort} />
            <label className="relative inline-block w-57px h-45px">
              <input type="checkbox" onChange={() => setIsListMode(!isListMode)} className="w-0px h-0px opacity-0" />
              <span
                className={`absolute w-full h-full cursor-pointer rounded-15px ${
                  isListMode ? "bg-dark-orange search-section-switch-inner-shadow" : "bg-white search-section-shadow-border"
                }`}
              >
                <img src={isListMode ? SquaresWhiteIcon : SquaresGoldIcon} alt="squares" className="switch-image" />
              </span>
            </label>
          </div>
          <div className={`result-tiles-container ${isListMode ? "-mr-20px" : "-mr-40px"}`}>
            {visibleTiles.length === 0 ? (
              <div className="w-full mt-100px mr-40px text-center text-14px leading-14px font-metropolis font-bold">
                {noResultsLabel}
              </div>
            ) : (
              visibleTiles.map((item, i) => {
                return (
                  <SearchTile
                    key={i}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    city={item.city}
                    neighborhood={item.neighborhood}
                    price={item.price}
                    link={item.link}
                    className="mr-40px mb-22px"
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="map-container">
        <SearchMap
          allProjects={allProjects}
          filteredProjects={filteredProjects}
          centerPosition={centerPosition}
          zoom={zoom}
          onMapChange={onMapChange}
        />
      </div>
    </>
  );
};

export default SearchSectionDesktop;
