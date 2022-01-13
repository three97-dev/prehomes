import React from "react";
import PropTypes from "prop-types";

import "./ViewByLinks.css";

const ViewByLinks = ({ title, links }) => {
  return (
    <div className="bg-black-gray w-full pt-50px md+:pt-75px pb-40px md+:pb-71px">
      <div className={`md+:view-by-links-grid px-30px md+:px-0px md+:mx-120px`}>
        <h2
          className={`text-29px md+:text-33px leading-42px md+:leading-50px font-bold font-poppins tracking-wide text-white border-b md+:border-b-0 border-dark-orange pb-20px md+:pb-0px mb-20px md+:mb-0px`}
        >
          {title}
        </h2>
        <div
          className={`view-by-links-mobile sm+:view-by-links-desktop view-by-links-hide-scroll flex sm+:grid grid-cols-4 border-l-0 md+:border-l md+:border-dark-orange pl-5px md+:pl-41px`}
        >
          {links.map((linksColumn, index) => (
            <ul key={index} className={index === links.length - 1 ? "" : "pr-25px sm+:pr-0px"}>
              {linksColumn.map((link, index) => (
                <li key={index} className="view-by-links-item">
                  <a className="text-14px md:text-16px leading-24px font-poppins font-light text-beige" href={link.url}>
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
