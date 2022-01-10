import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import axios from "axios";

import ModalSearchResults from "../modal-search-results/ModalSearchResults";

import useOnClickOutside from "../../utils/useOnClickOutside";
import useDebounce from "../../utils/useDebounce";

import ProjectIcon from "../../assets/hero/project-icon.svg";
import LocationIcon from "../../assets/hero/location-icon.svg";
import DeveloperIcon from "../../assets/hero/developer-icon.svg";
import CityIcon from "../../assets/hero/city-icon.svg";

import "./SearchInput.css";

const SearchInput = ({ searchPlaceholder, onForceLocationChange }) => {
  const [isSearchMenuShown, setIsSearchMenuShown] = useState(false);
  const inputRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [shortList, setShortList] = useState([]);
  const [longList, setLongList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchResults(searchTermStr) {
      try {
        const res = await axios.post("/.netlify/functions/search", {
          searchTerm: searchTermStr,
        });

        setShortList(res.data.shortList);
        setLongList(res.data.longList);
      } catch (err) {
        console.log("Search API error:", err);
      }
    }

    if (debouncedSearchTerm) {
      fetchResults(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setShortList, setLongList]);

  const openModal = () => {
    setIsSearchMenuShown(false);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const inputMenu = useOnClickOutside(inputRef, () => {
    setIsSearchMenuShown(false);
  });

  const getIconByType = type => {
    if (type === "project") return ProjectIcon;
    if (type === "developer") return DeveloperIcon;
    if (type === "city") return CityIcon;
    if (type === "place") return LocationIcon;
  };

  return (
    <div ref={inputMenu} className="relative">
      <input
        placeholder={searchPlaceholder}
        className={`relative z-10 text-16px md:text-14 leading-16px md:leading-14px font-metropolis w-full h-45px pl-20px md:pl-52px pr-45px md:pr-20px rounded-15px placeholder-dark-orange bg-white focus-visible:outline-none focus:outline-none search-section-input-shadow md:border md:border-silver`}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchMenuShown(true)}
      />
      {shortList.length > 0 && isSearchMenuShown && (
        <ul className="dropdown-menu">
          {shortList.map(({ label, type, link, index, lat, lng }) => (
            <li
              key={index}
              className="list-item"
              onMouseDown={() => {
                navigate(link);
                if (type === "place") {
                  onForceLocationChange({ lat, lng });
                }
              }}
            >
              <div className="item-image">
                <img className="my-auto mx-auto" src={getIconByType(type)} alt="" />
              </div>
              <div className="text-wrapper">
                <div className={`text-title item-title text-18px text-tundora leading-16px font-metropolis mb-7px`}>
                  {label}
                </div>
                <div className={`item-subtitle text-10px text-tundora font-metropolis font-bold`}>{type}</div>
              </div>
            </li>
          ))}
          <li className="list-item" onMouseDown={openModal}>
            <div className={`item-search-for text-tundora font-metropolis`}>
              Search for <b>{searchTerm}</b>
            </div>
          </li>
        </ul>
      )}
      <ModalSearchResults
        items={longList}
        modalIsOpen={modalIsOpen}
        onForceLocationChange={onForceLocationChange}
        onClose={closeModal}
        getIconByType={getIconByType}
        searchTerm={searchTerm}
      />
    </div>
  );
};

SearchInput.propTypes = {
  searchPlaceholder: PropTypes.string,
};

SearchInput.defaultProps = {
  searchPlaceholder: "",
};

export default SearchInput;
