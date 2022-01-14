import React from "react";
import PropTypes from "prop-types";

import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const Image = ({ image, className, width, height, objectFill }) => {
  if (!image) {
    return <div className={className}>missing image data</div>;
  }
  if (image.mock) {
    return <img src={image.mock} alt="mocked" className={className} width={width} height={height} />;
  }

  if (image.file.contentType === "image/svg+xml") {
    return <img src={image.file.url} alt={image.title} className={className} width={width} height={height} />;
  } else {
    return (
      <GatsbyImage
        objectFit={objectFill && "fill"}
        image={image.gatsbyImageData}
        alt={image.title}
        className={className}
      />
    );
  }
};

Image.propTypes = {
  className: PropTypes.string,
};

Image.defaultProps = {
  className: "",
};

export default Image;

export const query = graphql`
  fragment Image on ContentfulAsset {
    file {
      url
      contentType
    }
    title
    gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
  }
  fragment SearchImage on ContentfulAsset {
    file {
      url
      contentType
    }
    title
    gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, width: 350)
  }
  fragment SEOImage on ContentfulAsset {
    file {
      url
    }
  }
`;
