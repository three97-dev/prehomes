import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";
import UniversalLink from "../../../utils/UniversalLink";

const BlogPostTile = ({ title, subtitle, postDate, slug, linkLabel, postImage, className }) => {
  const link = `/blog/${slug}`;
  return (
    <div className={`tile-shadow bg-tile-content w-318px md:w-328px lg:w-536px ${className}`}>
      <div className="pl-20px lg:pl-36px pt-33px lg:pt-50px pb-28px md:pb-30px lg:pb-38px">
        <div className="md:h-197px lg:h-full">
          <UniversalLink link={link}>
            <Text typography="h2" className="mb-12px lg:mr-55px hover:underline">
              {title}
            </Text>
          </UniversalLink>
          <Text typography="h3" className="mb-12px md:mr-10px">
            {subtitle}
          </Text>
        </div>
        <Text typography="body" className="mb-8px lg:mb-9px">
          {postDate}
        </Text>
        <UniversalLink link={link}>
          <Text typography="body" color="text-tile-bg-3 hover:underline">
            {linkLabel}
          </Text>
        </UniversalLink>
      </div>
      <Image image={postImage} />
    </div>
  );
};

BlogPostTile.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  postDate: PropTypes.string,
  slug: PropTypes.string,
  linkLabel: PropTypes.string,
  postImage: PropTypes.object,
  className: PropTypes.string,
};

BlogPostTile.defaultProps = {
  title: "some title",
  subtitle: "some subtitle",
  postDate: "2021-09-01",
  slug: "some slug",
  linkLabel: "some linkLabel",
  className: "",
};

export default BlogPostTile;

// export const query = graphql`
//   fragment BlogPostTile on ContentfulBlogPost {
//     slug
//     title
//     subtitle
//     postDate
//     postImage {
//       file {
//         url
//         contentType
//       }
//       title
//       gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 536, height: 268)
//     }
//   }
// `;
