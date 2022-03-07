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
          className={`view-by-links-mobile sm+:view-by-links-desktop view-by-links-hide-scroll flex flex-wrap sm+:flex-no-wrap sm+:grid grid-cols-4 border-l-0 md+:border-l md+:border-dark-orange pl-5px md+:pl-41px`}
        >
          {links.map((linksColumn, index) => (
            <ul key={index} className={index === links.length - 1 ? "" : "pr-25px sm+:pr-0px"}>
              {linksColumn.map((link, index) =>
                link ? (
                  <li key={index} className="view-by-links-item">
                    <a className="link-font text-white" href={link.url.pageUrl}>
                      {link.label}
                    </a>
                  </li>
                ) : (
                  viewAllLink && (
                    <li key="view-all" className="view-by-links-item w-full view-all-li">
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
