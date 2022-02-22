import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import helpMarkImage from "../../assets/help-mark/help-mark.svg";
import searchImage from "../../assets/search.svg";

import TextSection from "../text-section/TextSection";
import Input from "../basic/input/Input";
import City from "../city/City";
import Paginator from "../paginator/Paginator";

const CitiesSection = ({ title, showHelpMark, helpMarkTooltip, cities }) => {
  const [filteredCities, setFilteredCities] = useState(cities);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const pageCount = useMemo(() => {
    const newPageCount = Math.ceil(searchTerm.length / itemsPerPage);
    return newPageCount;
  }, [searchTerm, itemsPerPage]);

  const handlePageClick = useCallback(
    event => {
      const newOffset = (event.selected * itemsPerPage) % searchTerm.length;
      setPageOffset(newOffset);
    },
    [itemsPerPage, setPageOffset]
  );

  const currentItems = useMemo(() => {
    const newCurrentItems = filteredCities.slice(pageOffset, pageOffset + itemsPerPage);
    return newCurrentItems;
  }, [filteredCities, itemsPerPage, pageOffset]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCities(cities.filter(city => city.cityName.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredCities(cities);
    }
  }, [searchTerm]);

  return (
    <div className="px-25px xl:px-0px">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <TextSection title={title} />
        {showHelpMark && (
          <img src={helpMarkImage} title={helpMarkTooltip} className="ml-80px hidden md:block" alt="help mark image" />
        )}
        <div className="flex items-center shadow-md border border-silver px-20px rounded-15px w-full md:w-1/3">
          <img src={searchImage} alt="Search Icon" />
          <Input
            value={searchTerm}
            type="text"
            placeholder="Search for City"
            placeholderColor="placeholder-dark-orange"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-60px">
        {currentItems.length > 0 ? (
          <div className="flex justify-between flex-wrap">
            {currentItems.map(city => (
              <City city={city} key={city.contentful_id} />
            ))}
          </div>
        ) : (
          <p className="text-center">No cities found.</p>
        )}
        {filteredCities.length > itemsPerPage && <Paginator pageCount={pageCount} handlePageClick={handlePageClick} />}
      </div>
    </div>
  );
};

CitiesSection.propTypes = {
  title: PropTypes.string,
  showHelpMark: PropTypes.bool,
  helpMarkTooltip: PropTypes.string,
  cities: PropTypes.array,
};

CitiesSection.defaultProps = {
  title: "",
  helpMarkTooltip: "",
  showHelpMark: false,
  cities: [],
};

export default CitiesSection;
