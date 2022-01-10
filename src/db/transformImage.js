// code copied from gatsby-source-contentful & gatsby-plugin-image
const qs = require(`qs`);

const getBasicImageProps = (image, args) => {
  let aspectRatio;

  if (args.width && args.height) {
    aspectRatio = args.width / args.height;
  } else {
    aspectRatio = image.file.details.image.width / image.file.details.image.height;
  }

  return {
    baseUrl: image.file.url,
    contentType: image.file.contentType,
    aspectRatio,
    width: image.file.details.image.width,
    height: image.file.details.image.height,
  };
};

const generateImageSource = (filename, width, height, toFormat, { quality }) => {
  const CONTENTFUL_IMAGE_MAX_SIZE = 4000;

  // Ensure we stay within Contentfuls Image API limits
  if (width > CONTENTFUL_IMAGE_MAX_SIZE) {
    height = Math.floor((height / width) * CONTENTFUL_IMAGE_MAX_SIZE);
    width = CONTENTFUL_IMAGE_MAX_SIZE;
  }

  if (height > CONTENTFUL_IMAGE_MAX_SIZE) {
    width = Math.floor((width / height) * CONTENTFUL_IMAGE_MAX_SIZE);
    height = CONTENTFUL_IMAGE_MAX_SIZE;
  }

  const urlArgs = {
    w: width || undefined,
    h: height || undefined,
    q: quality || undefined,
    fm: toFormat || undefined,
  };

  const src = `${filename}?${qs.stringify(urlArgs)}`;
  return {
    width,
    height,
    format: toFormat,
    src,
  };
};

var DEFAULT_FLUID_WIDTH = 800;
var DEFAULT_PIXEL_DENSITIES = [0.25, 0.5, 1, 2];
var sortNumeric = function (a, b) {
  return a - b;
};

var getSrcSet = function (images) {
  return images
    .map(function (image) {
      return image.src + " " + image.width + "w";
    })
    .join(",\n");
};

var getSizes = function (width) {
  return "(min-width: " + width + "px) " + width + "px, 100vw";
};

function responsiveImageSizes({ sourceMetadata, width, height }) {
  const imgDimensions = sourceMetadata;
  const aspectRatio = imgDimensions.width / imgDimensions.height;

  // Case 1: width of height were passed in, make sure it isn't larger than the actual image
  width = width && Math.min(width, imgDimensions.width);
  height = height && Math.min(height, imgDimensions.height);
  // Case 2: neither width or height were passed in, use default size
  if (!width && !height) {
    width = Math.min(DEFAULT_FLUID_WIDTH, imgDimensions.width);
    height = width / aspectRatio;
  }
  // if it still hasn't been found, calculate width from the derived height.
  // TS isn't smart enough to realise the type for height has been narrowed here
  if (!width) {
    width = height * aspectRatio;
  }
  const originalWidth = width;

  if (imgDimensions.width < width || imgDimensions.height < height) {
    width = imgDimensions.width;
    height = imgDimensions.height;
  }
  width = Math.round(width);

  let sizes = DEFAULT_PIXEL_DENSITIES.map(function (density) {
    return Math.round(density * width);
  });
  sizes = sizes.filter(function (size) {
    return size <= imgDimensions.width;
  });

  // ensure that the size passed in is included in the final output
  if (!sizes.includes(width)) {
    sizes.push(width);
  }
  sizes = sizes.sort(sortNumeric);
  return {
    sizes,
    aspectRatio,
    presentationWidth: originalWidth,
  };
}

function generateImageData(args) {
  let sourceMetadata = args.sourceMetadata,
    generateImageSource = args.generateImageSource,
    layout = args.layout,
    options = args.options,
    filename = args.filename,
    backgroundColor = args.backgroundColor;

  const formats = new Set(args.formats);

  const imageSizes = responsiveImageSizes(Object.assign({}, args, { sourceMetadata }));
  const result = {
    sources: [],
  };
  const sizes = getSizes(imageSizes.presentationWidth);

  formats.forEach(function (format) {
    const images = imageSizes.sizes.map(size => {
      const imageSrc = generateImageSource(filename, size, Math.round(size / imageSizes.aspectRatio), format, options);

      return imageSrc;
    });

    result.sources.push({
      srcSet: getSrcSet(images),
      sizes: sizes,
      type: "image/" + format,
    });
  });

  return {
    images: result,
    layout: layout,
    backgroundColor: backgroundColor,
    width: args.width || imageSizes.presentationWidth || 1,
    height: Math.round((args.width || imageSizes.presentationWidth || 1) / imageSizes.aspectRatio),
  };
}

const convertContentfulImageToGatsbyFormat = (image, options = {}) => {
  const mergedOptions = {
    layout: "constrained",
    placeholder: "blurred",
    formats: ["webp"],
    jpegProgressive: true,
    quality: 50,
    backgroundColor: "rgba(50,50,50,0.5)",
    ...options,
  };

  const { baseUrl, contentType, width, height } = getBasicImageProps(image, mergedOptions);
  let [, format] = contentType.split(`/`);

  if (format === `jpeg`) {
    format = `jpg`;
  }

  const gatsbyImageData = generateImageData({
    ...mergedOptions,
    pluginName: `gatsby-source-contentful`,
    sourceMetadata: {
      width,
      height,
      format,
    },
    filename: baseUrl,
    generateImageSource,
    options: mergedOptions,
  });

  return {
    title: image.title,
    file: {
      contentType: image.file.contentType,
      url: image.file.url,
    },
    gatsbyImageData,
  };
};

module.exports = convertContentfulImageToGatsbyFormat;
