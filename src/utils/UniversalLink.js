import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const isExternalLink = link => {
  return link.startsWith("http");
};

const convertLinkToUrl = link => {
  return link.startsWith("/") ? link : `/${link}`;
};

const UniversalLink = ({ link, openInNewTab, children, className, ...otherProps }) => {
  let targetLink = link;

  if (!isExternalLink(targetLink)) {
    targetLink = convertLinkToUrl(targetLink);
  }

  if (openInNewTab) {
    return (
      <a href={targetLink} target="_blank" rel="noreferrer noopener" className={className} {...otherProps}>
        {children}
      </a>
    );
  } else {
    if (isExternalLink(targetLink)) {
      return (
        <a href={targetLink} className={className} {...otherProps}>
          {children}
        </a>
      );
    } else {
      return (
        <Link to={targetLink} className={className} {...otherProps}>
          {children}
        </Link>
      );
    }
  }
};

UniversalLink.propTypes = {
  link: PropTypes.string,
  openInNewTab: PropTypes.bool,
  children: PropTypes.any,
};

UniversalLink.defaultProps = {
  link: "/",
  openInNewTab: false,
};

export default UniversalLink;
