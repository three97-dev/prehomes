import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import helpMarkImage from "../../assets/help-mark/help-mark.svg";
import searchImage from "../../assets/search.svg";

import TextSection from "../text-section/TextSection";
import Input from "../basic/input/Input";
import HorizontalCard from "../horizontal-card/HorizontalCard";
import Paginator from "../paginator/Paginator";

const DevelopersSection = ({ title, showHelpMark, helpMarkTooltip, developers }) => {
  const [filteredDevelopers, setFilteredDevelopers] = useState(developers);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  const pageCount = useMemo(() => {
    const newPageCount = Math.ceil(filteredDevelopers.length / itemsPerPage);
    return newPageCount;
  }, [filteredDevelopers, itemsPerPage]);

  const handlePageClick = useCallback(
    event => {
      const newOffset = (event.selected * itemsPerPage) % filteredDevelopers.length;
      setPageOffset(newOffset);
    },
    [itemsPerPage, setPageOffset, filteredDevelopers]
  );

  const currentItems = useMemo(() => {
    const newCurrentItems = filteredDevelopers.slice(pageOffset, pageOffset + itemsPerPage);
    return newCurrentItems;
  }, [filteredDevelopers, itemsPerPage, pageOffset]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDevelopers(
        developers.filter(developer => developer.developerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      setFilteredDevelopers(developers);
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
            placeholder="Search for Developer"
            placeholderColor="placeholder-dark-orange"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-60px">
        {currentItems.length > 0 ? (
          <div className="flex justify-between flex-wrap">
            {currentItems.map(developer => (
              <HorizontalCard
                pageUrl={developer.fields.pageUrl}
                title={developer.developerName}
                image={developer.developerPreviewImage}
                key={developer.contentful_id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No developers found.</p>
        )}
        {filteredDevelopers.length > itemsPerPage && (
          <Paginator pageCount={pageCount} handlePageClick={handlePageClick} />
        )}
      </div>
    </div>
  );
};

DevelopersSection.propTypes = {
  title: PropTypes.string,
  showHelpMark: PropTypes.bool,
  helpMarkTooltip: PropTypes.string,
  developers: PropTypes.array,
};

DevelopersSection.defaultProps = {
  title: "",
  helpMarkTooltip: "",
  showHelpMark: false,
  developers: [],
};

export default DevelopersSection;
