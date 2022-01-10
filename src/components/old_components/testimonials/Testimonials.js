import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { graphql } from "gatsby";

import Image from "../basic/image/Image";
import Text from "../basic/text/Text";

import QuoteImage from "../../../assets/old_assets/pages/home/testimonials-quote.svg";
import TestimonialsArrow from "../../../assets/old_assets/pages/home/testimonials-arrow.svg";
import TestimonialsWeb from "../../../assets/old_assets/pages/home/testimonials-bg-web.svg";
import TestimonialsWebHD from "../../../assets/old_assets/pages/home/testimonials-bg-webhd.svg";

import "./Testimonials.css";

const Testimonials = ({ title, image, testimonialsToShow, className, ...otherProps }) => {
  const [slider, setSlider] = useState(null);
  const [index, setIndex] = useState(0);

  const settings = {
    arrows: false,
    className: "testimonials-slider-slick",
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 10000,
    dots: false,
    beforeChange: (current, next) => setIndex(next),
  };

  function next() {
    slider.slickNext();
  }
  function previous() {
    slider.slickPrev();
  }

  return (
    <div
      className={`grid relative overflow-hidden justify-items-center md:testimonials-tablet-grid md+:testimonials-tablet-bigger-grid lg:testimonials-desktop-grid xl:testimonials-hd-grid px-36px md:px-0px ${className}`}
      {...otherProps}
    >
      <img
        src={TestimonialsWeb}
        alt="background"
        className="hidden lg:block xl:hidden absolute -z-10 bottom-28px right-2px max-w-none"
      />
      <img
        src={TestimonialsWebHD}
        alt="background"
        className="hidden xl:block absolute -z-10 bottom-101px right-202px max-w-none"
      />
      <Text typography="h2" className="md:testimonials-header-area lg:justify-self-start h-auto md:self-end">
        {title}
      </Text>
      <img
        src={QuoteImage}
        alt="quote"
        className="hidden md:block md:testimonials-left-quote-area mt-20px md:mt-0px lg:mt-20px xl:w-60px self-start"
      />
      <img
        src={QuoteImage}
        alt="quote"
        className="hidden md:block md:testimonials-right-quote-area mb-95px lg:mb-0px lg:mt-172px xl:mt-95px xl:w-60px transform rotate-180 self-end lg:self-start"
      />
      <div className="md:testimonials-slide-area">
        <Slider ref={c => setSlider(c)} {...settings}>
          {testimonialsToShow.map((item, slideIndex) => (
            <div className="focus-visible:outline-none" key={slideIndex}>
              <div className="focus-visible:outline-none">
                <Text text={item.testimonial} typography="body" className="mt-20px text-tile-bg-4" />
                <div className="text-h4 md:text-testimonialsTablet xl:text-testimonialsWebhd text-fontcolor-h4 mt-20px justify-self-start">
                  <b>{item.author}</b>
                  <br />
                  {item.authorPosition},
                  <br />
                  {item.authorCompany}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex lg:grid lg:h-320px xl:h-428px w-full justify-between md:justify-center items-center md:content-center  md:testimonials-slider-dots-area relative mt-24px md:mt-20px lg:mt-146px xl:mt-255px ">
        <button
          className="grid place-items-center w-35px h-35px rounded-full bg-button-color-1 hover:bg-button-color-2 focus-visible:bg-button-color-2  active:bg-button-color-3 lg:mb-15px"
          onClick={previous}
        >
          <img src={TestimonialsArrow} alt="previous slide" className="transform lg:rotate-90" />
        </button>
        <div className="flex lg:grid justify-center justify-items-center lg:content-center items-center gap-15px md:gap-17px lg:gap-15px xl:gap-20px md:w-500px lg:w-full lg:h-212px xl:h-312px testimonials-slider-dots">
          <div className="lg:justify-self-center w-154px md:w-329px lg:w-1px h-1px lg:h-212px xl:h-312px bg-line-color3 absolute -z-10" />
          {testimonialsToShow.map((item, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => slider.slickGoTo(slideIndex)}
              aria-label={`Testimonial ${slideIndex + 1}`}
              className={`text-transparent outline-none ${
                slideIndex === index
                  ? "slick-active w-8px xl:w-14px h-8px xl:h-14px"
                  : "w-10px xl:w-16px h-10px xl:h-16px"
              }`}
            />
          ))}
        </div>
        <button
          className="grid place-items-center w-35px h-35px rounded-full bg-button-color-1 hover:bg-button-color-2 focus-visible:bg-button-color-2  active:bg-button-color-3 lg:mt-15px"
          onClick={next}
        >
          <img src={TestimonialsArrow} alt="next slide" className="transform rotate-180 lg:-rotate-90" />
        </button>
      </div>
      <div className="testimonials-image-area hidden lg:block mt-15px md:mt-0px w-318px md:w-328px lg:w-full max-w-536px">
        <Image image={image} />
      </div>
    </div>
  );
};

Testimonials.propTypes = {
  title: PropTypes.string,
  image: PropTypes.object,
  testimonialsToShow: PropTypes.array,
  className: PropTypes.string,
};

Testimonials.defaultProps = {
  title: "Testimonials",
  testimonialsToShow: [],
  className: "",
};

export default Testimonials;

// export const query = graphql`
//   fragment TestimonialToShow on ContentfulTestimonialItem {
//     author
//     authorCompany
//     authorPosition
//     testimonial {
//       childMarkdownRemark {
//         html
//       }
//     }
//   }
//   fragment Testimonials on ContentfulTestimonials {
//     title
//     image {
//       ...Image
//     }
//     testimonialsToShow {
//       ...TestimonialToShow
//     }
//   }
// `;
