import React from "react";

import UniversalLink from "../../../utils/UniversalLink";

import ArrayButton from "../../../assets/old_assets/pages/blog/testemonials-arrow-left-mobile.svg";

import "./BlogPaginator.css";
import Text from "../basic/text/Text";

const ADJACENT_LINKS = 3;
const MAX_VISIBLE_LINKS = ADJACENT_LINKS * 2 + 1;

const BlogPaginator = ({ currentPage, totalPages, className, ...otherProps }) => {
  // skip pagination if only one page is present
  if (totalPages < 2) {
    return null;
  }
  const allPages = [];
  for (let page = 0; page < totalPages; page++) {
    const pageNumber = page + 1;
    const url = page === 0 ? `/blog/#post-tiles` : `/blog/page/${pageNumber}#post-tiles`;

    allPages.push({
      url,
      pageNumber,
    });
  }

  const showLeftControls = currentPage > 1;
  const showRightControls = currentPage !== totalPages;

  let sliceStart;
  let sliceEnd;
  if (currentPage < ADJACENT_LINKS + 1) {
    // left edge case
    sliceStart = Math.max(0, currentPage - 1 - ADJACENT_LINKS);
    sliceEnd = Math.min(sliceStart + MAX_VISIBLE_LINKS + 1, totalPages);
  } else if (currentPage > totalPages - ADJACENT_LINKS - 1) {
    // right edge case
    sliceEnd = totalPages;
    sliceStart = Math.min(totalPages - MAX_VISIBLE_LINKS, currentPage - 1 - ADJACENT_LINKS);
  } else {
    // page in the middle case
    sliceStart = currentPage - 1 - ADJACENT_LINKS;
    sliceEnd = sliceStart + MAX_VISIBLE_LINKS;
  }
  const pagesToShow = allPages.slice(Math.max(sliceStart, 0), Math.min(sliceEnd, totalPages));

  return (
    <span className="w-full mb-10px">
      <div className={`grid items-center paginator-grid ${className}`} {...otherProps}>
        {showLeftControls ? (
          <div className="flex array-left m-2px">
            <UniversalLink link={allPages[currentPage - 2].url}>
              <img alt="previous slide" src={ArrayButton} className="m-5px" />
            </UniversalLink>
          </div>
        ) : null}
        <div className="button-paginator flex">
          {pagesToShow.map((page, index) => {
            return (
              <div
                key={index}
                className={
                  page.pageNumber === currentPage
                    ? "flex border border-circle-paginator rounded-full w-35px mx-5px"
                    : "flex w-35px mx-5px justify-center"
                }
              >
                {page.pageNumber === currentPage ? (
                  <Text typography="paginator" className="my-4px mx-auto">
                    {page.pageNumber}
                  </Text>
                ) : (
                  <UniversalLink link={page.url}>
                    <Text typography="paginator" className="my-4px mx-auto">
                      {page.pageNumber}
                    </Text>
                  </UniversalLink>
                )}
              </div>
            );
          })}
        </div>
        {showRightControls ? (
          <div className="flex array-right m-2px">
            <UniversalLink link={allPages[currentPage].url}>
              <img alt="next slide" src={ArrayButton} className="transform rotate-180 m-5px" />
            </UniversalLink>
          </div>
        ) : null}
      </div>
    </span>
  );
};

export default BlogPaginator;
