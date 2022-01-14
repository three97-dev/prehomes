import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import ModalSearchResults from "../../modal-search-results/ModalSearchResults";

import useDebounce from "../../../utils/useDebounce";
import useOnClickOutside from "../../../utils/useOnClickOutside";

import HeroSearch from "../../../assets/hero/hero-search.svg";
import ProjectIcon from "../../../assets/hero/project-icon.svg";
import LocationIcon from "../../../assets/hero/location-icon.svg";
import DeveloperIcon from "../../../assets/hero/developer-icon.svg";
import CityIcon from "../../../assets/hero/city-icon.svg";

import "./HomeHeroInput.css";
import { navigate } from "gatsby";

const HomeHeroInput = ({ className, height, placeholder }) => {
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSearchMenuShown, setIsSearchMenuShown] = useState(false);

  const [shortList, setShortList] = useState([]);
  const [longList, setLongList] = useState([]);

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

  const inputMenu = useOnClickOutside(inputRef, () => {
    setIsSearchMenuShown(false);
  });

  const getIconByType = type => {
    if (type === "project") return ProjectIcon;
    if (type === "developer") return DeveloperIcon;
    if (type === "city") return CityIcon;
    if (type === "place") return LocationIcon;
  };

  const openModal = () => {
    setIsSearchMenuShown(false);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div ref={inputMenu} className={`${className} relative`}>
      <input
        className={`home-hero-input-shadow placeholder-font w-full z-10 ${height} rounded-15px pl-20px pr-40px placeholder-dark-orange bg-white focus-visible:outline-none focus:outline-none`}
        type="text"
        placeholder={placeholder}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearchMenuShown(true)}
      />
      <span className="hidden md:block absolute z-20 top-18px right-20px">
        <img src={HeroSearch} alt="search icon" />
      </span>
      {shortList.length > 0 && isSearchMenuShown && (
        <ul className="dropdown-menu">
          {shortList.map(({ label, type, link, index }) => (
            <li key={index} className="list-item" onMouseDown={() => navigate(link)}>
              <div className="item-image">
                <img className="my-auto" src={getIconByType(type)} alt="" />
              </div>
              <div className="text-wrapper mt-12px">
                <div className={`text-title item-title link-font text-black-gray`}>
                  {label}
                </div>
              </div>
            </li>
          ))}
          <li className="list-item" onMouseDown={openModal}>
            <div className={`item-search-for link-font text-black-gray`}>
              Search for <b>"{searchTerm}"</b>
            </div>
          </li>
        </ul>
      )}
      <ModalSearchResults
        items={longList}
        modalIsOpen={modalIsOpen}
        onClose={closeModal}
        getIconByType={getIconByType}
        searchTerm={searchTerm}
      />
    </div>
  );
};

HomeHeroInput.propTypes = {
  placeholder: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

HomeHeroInput.defaultProps = {
  placeholder: "",
  className: "",
  height: "h-53px",
};

export default HomeHeroInput;
