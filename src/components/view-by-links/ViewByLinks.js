import React from "react";
import PropTypes from "prop-types";

import "./ViewByLinks.css";

const ViewByLinks = ({ title, links }) => {
  return (
    <div className="bg-tundora w-full pt-60px md+:pt-75px pb-51px">
      <div className={`md+:view-by-links-grid px-30px md+:mx-120px`}>
        <h2
          className={`text-23px md+:text-29px leading-23px md+:leading-29px font-bold font-metropolis tracking-wide text-cream-pink mb-30px md+:mb-0px`}
        >
          {title}
        </h2>
        <div className={`view-by-links-mobile sm+:view-by-links-desktop view-by-links-hide-scroll flex sm+:grid sm+:grid-cols-4`}>
          {links.map((linksColumn, index) => (
            <ul key={index} className={index === links.length - 1 ? "" : "pr-25px sm+:pr-0px"}>
              {linksColumn.map((link, index) => (
                <li key={index} className="mb-20px">
                  <a className="text-16px leading-24px font-metropolis text-beige" href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

ViewByLinks.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};

ViewByLinks.defaultProps = {
  title: "",
  links: [],
};

export default ViewByLinks;
