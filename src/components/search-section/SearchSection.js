import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useLocation, navigate } from "@reach/router";

import SearchSectionDesktop from "./SearchSectionDesktop";
import SearchSectionMobile from "./SearchSectionMobile";

import { options } from "../../utils/filterOptions";
import useApplyAfterWidth from "../../utils/useApplyAfterWidth";

import "./SearchSection.css";

const SearchSection = ({
  searchPlaceholder,
  typeFilterTitle,
  bedsFilterTitle,
  bathsFilterTitle,
  minPriceFilterTitle,
  maxPriceFilterTitle,
  minSizeFilterTitle,
  maxSizeFilterTitle,
  searchForLabel,
  resultsLabel,
  noResultsLabel,
  allProjects,
  allTypes,
  modalTitle,
  clearButtonLabel,
  applyButtonLabel,
  newHomesForSaleLabel,
  filtersLabel,
  mapViewLabel,
  listViewLabel,
  className,
}) => {
  const location = useLocation();
  const isDesktop = useApplyAfterWidth(833);
  const [centerPosition, setCenterPosition] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [zoom, setZoom] = useState(null);

  options.types = [options.types[0], ...allTypes.map(e => ({ value: e.name, label: e.name }))];

  const defaultFilters = {
    typeFilter: options.types[0],
    bedsFilter: options.beds[0],
    bathsFilter: options.baths[0],
    minPriceFilter: options.minPrice[0],
    maxPriceFilter: options.maxPrice[0],
    minSizeFilter: "",
    maxSizeFilter: "",
  };
  const [filter, setFilter] = useState(defaultFilters);

  const [typeSort, setTypeSort] = useState(options.sort[0]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      if (filter.typeFilter.value && !project.types?.filter(type => type.name == filter.typeFilter.value).length > 0)
        return false;
      if (filter.bedsFilter.value && filter.bedsFilter.value > project.maxBeds) return false;
      if (filter.bathsFilter.value && filter.bathsFilter.value > project.maxBaths) return false;

      const filteredPrices = project.prices.filter(price => {
        if (filter.minPriceFilter.value && filter.minPriceFilter.value >= price) return false;
        if (filter.maxPriceFilter.value && filter.maxPriceFilter.value <= price) return false;

        return true;
      });
      if (filteredPrices.length === 0) return false;

      const filteredSquareFootages = project.squareFootages.filter(squareFootage => {
        if (filter.minSizeFilter && filter.minSizeFilter > squareFootage) return false;
        if (filter.maxSizeFilter && filter.maxSizeFilter < squareFootage) return false;

        return true;
      });
      if (filteredSquareFootages.length === 0) return false;

      return true;
    });
  }, [filter, allProjects]);

  const visibleTiles = useMemo(() => {
    if (mapBounds) {
      return filteredProjects.filter(location => {
        if (mapBounds.contains({ lat: location.lat, lng: location.lng })) {
          return true;
        }

        return false;
      });
    } else {
      return [];
    }
  }, [mapBounds, filteredProjects]);

  const sortedTiles = useMemo(() => {
    if (typeSort.value === "price-lo-hi") {
      return [...visibleTiles].sort((a, b) => a.prices[0] - b.prices[0]);
    }
    if (typeSort.value === "price-hi-lo") {
      return [...visibleTiles].sort((a, b) => b.prices[0] - a.prices[0]);
    }
    if (typeSort.value === "beds") {
      return [...visibleTiles].sort((a, b) => a.maxBeds - b.maxBeds);
    }
    if (typeSort.value === "baths") {
      return [...visibleTiles].sort((a, b) => a.maxBaths - b.maxBaths);
    }
    if (typeSort.value === "size") {
      return [...visibleTiles].sort((a, b) => a.squareFootages[0] - b.squareFootages[0]);
    }
    return visibleTiles;
  }, [typeSort, visibleTiles]);

  const onForceLocationChange = ({ lat, lng }) => {
    setZoom(15);
    setCenterPosition({ lat, lng });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lat = parseFloat(params.get("lat"));
    const lng = parseFloat(params.get("lng"));
    const zoom = parseFloat(params.get("zoom"));

    if (lat && lng) {
      setCenterPosition({ lat, lng });
    }

    if (zoom) {
      setZoom(Number(zoom));
    }
  }, []);

  useEffect(() => {
    if (mapBounds && zoom) {
      const lat = mapBounds.getCenter().lat();
      const lng = mapBounds.getCenter().lng();
      navigate(`/search?lat=${lat}&lng=${lng}&zoom=${zoom}`);
    }
  }, [mapBounds, zoom, navigate]);

  const onMapChange = useCallback(
    ({ bounds, zoom }) => {
      setMapBounds(bounds);
      setZoom(zoom);
    },
    [setMapBounds, setZoom]
  );

  const onClear = useCallback(() => {
    setFilter(defaultFilters);
  }, [setFilter, defaultFilters]);

  const onApply = useCallback(
    values => {
      setFilter(values);
    },
    [setFilter]
  );

  return (
    <div className={className}>
      {isDesktop !== undefined &&
        (isDesktop ? (
          <SearchSectionDesktop
            filter={filter}
            setFilter={setFilter}
            visibleTiles={sortedTiles}
            typeSort={typeSort}
            setTypeSort={setTypeSort}
            filteredProjects={filteredProjects}
            centerPosition={centerPosition}
            zoom={zoom}
            onMapChange={onMapChange}
            onForceLocationChange={onForceLocationChange}
            searchPlaceholder={searchPlaceholder}
            typeFilterTitle={typeFilterTitle}
            bedsFilterTitle={bedsFilterTitle}
            bathsFilterTitle={bathsFilterTitle}
            minPriceFilterTitle={minPriceFilterTitle}
            maxPriceFilterTitle={maxPriceFilterTitle}
            minSizeFilterTitle={minSizeFilterTitle}
            maxSizeFilterTitle={maxSizeFilterTitle}
            searchForLabel={searchForLabel}
            resultsLabel={resultsLabel}
            noResultsLabel={noResultsLabel}
            allProjects={allProjects}
            className="relative pt-102px pl-20px min-h-screen bg-light-gray z-10"
          />
        ) : (
          <SearchSectionMobile
            onClear={onClear}
            onApply={onApply}
            onMapChange={onMapChange}
            onForceLocationChange={onForceLocationChange}
            typeFilterTitle={typeFilterTitle}
            bedsFilterTitle={bedsFilterTitle}
            bathsFilterTitle={bathsFilterTitle}
            minPriceFilterTitle={minPriceFilterTitle}
            maxPriceFilterTitle={maxPriceFilterTitle}
            minSizeFilterTitle={minSizeFilterTitle}
            maxSizeFilterTitle={maxSizeFilterTitle}
            typeSort={typeSort}
            setTypeSort={setTypeSort}
            searchPlaceholder={searchPlaceholder}
            searchForLabel={searchForLabel}
            noResultsLabel={noResultsLabel}
            allProjects={allProjects}
            visibleTiles={sortedTiles}
            filteredProjects={filteredProjects}
            centerPosition={centerPosition}
            zoom={zoom}
            resultsLabel={resultsLabel}
            modalTitle={modalTitle}
            clearButtonLabel={clearButtonLabel}
            applyButtonLabel={applyButtonLabel}
            filter={filter}
            options={options}
            newHomesForSaleLabel={newHomesForSaleLabel}
            filtersLabel={filtersLabel}
            mapViewLabel={mapViewLabel}
            listViewLabel={listViewLabel}
          />
        ))}
    </div>
  );
};

export default SearchSection;

SearchSection.propTypes = {
  searchPlaceholder: PropTypes.string,
  typeFilterTitle: PropTypes.string,
  bedsFilterTitle: PropTypes.string,
  bathsFilterTitle: PropTypes.string,
  minPriceFilterTitle: PropTypes.string,
  maxPriceFilterTitle: PropTypes.string,
  minSizeFilterTitle: PropTypes.string,
  maxSizeFilterTitle: PropTypes.string,
  searchForLabel: PropTypes.string,
  resultsLabel: PropTypes.string,
  noResultsLabel: PropTypes.string,
  modalTitle: PropTypes.string,
  clearButtonLabel: PropTypes.string,
  applyButtonLabel: PropTypes.string,
  allProjects: PropTypes.array,
  className: PropTypes.string,
};

SearchSection.defaultProps = {
  searchPlaceholder: "",
  typeFilterTitle: "",
  bedsFilterTitle: "",
  bathsFilterTitle: "",
  minPriceFilterTitle: "",
  maxPriceFilterTitle: "",
  minSizeFilterTitle: "",
  maxSizeFilterTitle: "",
  searchForLabel: "",
  resultsLabel: "",
  noResultsLabel: "",
  modalTitle: "",
  clearButtonLabel: "",
  applyButtonLabel: "",
  allProjects: [],
  className: "",
};
