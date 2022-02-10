import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import ModalSearchResults from "../modal-search-results/ModalSearchResults";

import useOnClickOutside from "../../utils/useOnClickOutside";
import useDebounce from "../../utils/useDebounce";

import ProjectIcon from "../../assets/hero/project-icon.svg";
import LocationIcon from "../../assets/hero/location-icon.svg";
import DeveloperIcon from "../../assets/hero/developer-icon.svg";
import CityIcon from "../../assets/hero/city-icon.svg";

import "./SearchInput.css";

const SearchInput = ({ searchPlaceholder, onForceLocationChange, searchForLabel }) => {
  const [isSearchMenuShown, setIsSearchMenuShown] = useState(false);
  const inputRef = useRef();
  const [modalIsOpen, setIsOpen] = useState(false);

  const [shortList, setShortList] = useState([]);
  const [longList, setLongList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [gmapSessionToken, setGmapSessionToken] = useState(null);

  useEffect(() => {
    if (!gmapSessionToken) {
      setGmapSessionToken(uuidv4());
    }
  }, []);

  useEffect(() => {
    async function fetchResults(searchTermStr) {
      try {
        const res = await axios.post("/.netlify/functions/search", {
          searchTerm: searchTermStr,
          sessiontoken: gmapSessionToken,
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
        className="relative z-10 placeholder-font w-full h-45px pl-10px md:pl-52px pr-45px md:pr-20px rounded-15px placeholder-dark-orange bg-white focus-visible:outline-none focus:outline-none search-section-input-shadow border border-silver"
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
                  setIsSearchMenuShown(false);
                  onForceLocationChange({ lat, lng });
                  setSearchTerm(label);
                }
              }}
            >
              <div className="item-image">
                <img className="my-auto mx-auto" src={getIconByType(type)} alt="" />
              </div>
              <div className="text-wrapper mt-12px">
                <div className="text-title item-title link-font text-black-gray mb-7px">{label}</div>
              </div>
            </li>
          ))}
          <li className="list-item" onMouseDown={openModal}>
            <div className="item-search-for text-black-gray link-font">
              {searchForLabel}
              <b>"{searchTerm}"</b>
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
