import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

import "./ViewByLinks.css";

const ViewByLinks = ({ title, links, viewAllLink }) => {
  return (
    <div className="bg-black-gray w-full pt-50px md+:pt-75px pb-40px md+:pb-71px">
      <div className={`md+:view-by-links-grid px-30px md+:px-0px md+:mx-120px`}>
        <h2 className={`text-white border-b md+:border-b-0 border-dark-orange pb-20px md+:pb-0px mb-20px md+:mb-0px`}>
          {title}
        </h2>
        <div
          className={`w-full view-by-links-mobile sm+:view-by-links-desktop view-by-links-hide-scroll border-l-0 md+:border-l md+:border-dark-orange pl-5px md+:pl-41px`}
        >
          {links.map((linksColumn, index) => (
            <ul key={index} className="list">
              {linksColumn.map((link, index) =>
                link ? (
                  <li
                    key={index}
                    className="view-by-links-item sm+:view-by-links-items-desktop view-by-links-items-mobile"
                  >
                    <a className="link-font text-white pl-7px" href={link.url.pageUrl}>
                      {link.label}
                    </a>
                  </li>
                ) : (
                  viewAllLink && (
                    <li
                      key="view-all"
                      className="view-by-links-item w-full view-all-li sm+:view-by-links-items-desktop view-by-links-items-mobile"
                    >
                      <a className="link-font view-all" href={viewAllLink}>
                        View All
                        <StaticImage src="../../assets/arrow-right/arrow-right.svg" className="h-20px w-20px" />
                      </a>
                    </li>
                  )
                )
              )}
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
  viewAllLink: PropTypes.string,
};

ViewByLinks.defaultProps = {
  title: "",
  links: [],
  viewAllLink: "",
};

export default ViewByLinks;
