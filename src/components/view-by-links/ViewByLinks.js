import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

import "./ViewByLinks.css";

const ViewByLinks = ({ title, links, viewAllLink }) => {
  return (
    <div className="bg-mild-black w-full py-64px">
      <div className={`md+:view-by-links-grid px-25px md+:px-0px md+:mx-120px`}>
        <h2 className="title">
          <span className="text-mild-purple">View Projects By: </span>
          {title}
        </h2>
        <div
          className={`w-full pt-32px view-by-links-mobile sm+:view-by-links-desktop view-by-links-hide-scroll border-l-0 md+:border-l md+:border-dark-orange md+:pl-41px`}
        >
          {links.map((linksColumn, index) => (
            <ul key={index} className="list">
              {linksColumn.map((link, index) =>
                link ? (
                  <li
                    key={index}
                    className="view-by-links-item sm+:view-by-links-items-desktop view-by-links-items-mobile"
                  >
                    <a className="link-font text-white odd:pl-0px md:pl-8px font-medium" href={link.url.pageUrl}>
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
