import React from "react";
import PropTypes from "prop-types";

import BlogPaginator from "../blog-pagination/BlogPaginator";
import BlogPostTile from "../blog-post-tile/BlogPostTile";

import BlogImageBgMobile from "../../../assets/old_assets/pages/blog/blog-tiles-bg-mobile-w-632.svg";
import BlogImageBgTablet from "../../../assets/old_assets/pages/blog/blog-tiles-bg-tablet-plus.svg";

import "./FourBlogPosts.css";

const FourBlogPosts = ({ posts, linkLabel, currentPage, totalPages, className, ...otherProps }) => {
  return (
    <div className={`grid justify-items-center w-full overflow-x-hidden ${className}`} {...otherProps}>
      <div className="grid relative blog-grid-mobile md:blog-grid-tablet lg:blog-grid-webhd mt-55px md:mt-0px">
        <img
          src={BlogImageBgMobile}
          alt="background"
          className="md:hidden absolute -z-10 -bottom-0px -right-155px max-w-none"
        />
        <img
          src={BlogImageBgTablet}
          alt="background"
          className="hidden md:block absolute -z-10 -bottom-0px -right-509px lg:-bottom-0px lg:-right-180px xl:-bottom-0px xl:-right-531px lg:w-1453px xl:w-2061px max-w-none"
        />

        {posts[0] ? (
          <BlogPostTile
            className="blog-area-1"
            title={posts[0].title}
            subtitle={posts[0].subtitle}
            postDate={posts[0].postDate}
            slug={posts[0].slug}
            linkLabel={linkLabel}
            postImage={posts[0].postImage}
          />
        ) : null}
        {posts[1] ? (
          <BlogPostTile
            className="blog-area-2"
            title={posts[1].title}
            subtitle={posts[1].subtitle}
            postDate={posts[1].postDate}
            slug={posts[1].slug}
            linkLabel={linkLabel}
            postImage={posts[1].postImage}
          />
        ) : null}
        {posts[2] ? (
          <BlogPostTile
            className="blog-area-3"
            title={posts[2].title}
            subtitle={posts[2].subtitle}
            postDate={posts[2].postDate}
            slug={posts[2].slug}
            linkLabel={linkLabel}
            postImage={posts[2].postImage}
          />
        ) : null}
        {posts[3] ? (
          <BlogPostTile
            className="blog-area-4"
            title={posts[3].title}
            subtitle={posts[3].subtitle}
            postDate={posts[3].postDate}
            slug={posts[3].slug}
            linkLabel={linkLabel}
            postImage={posts[3].postImage}
          />
        ) : null}
        <div className="blog-paginator mt-23px mb-45px md:mt-45px md:mb-90px lg:mb-110px xl:mb-140px">
          <BlogPaginator currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

FourBlogPosts.propTypes = {
  posts: PropTypes.array,
  linkLabel: PropTypes.string,
};

FourBlogPosts.defaultProps = {
  posts: [],
  linkLabel: "some linkLabel",
};

export default FourBlogPosts;
