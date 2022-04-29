import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import Image from "../basic/image/Image";
import Button from "../basic/button/Button";
import ModalVideo from "../modal-video/ModalVideo";
import SliderArrow from "../basic/slider-arrow/SliderArrow";
import UniversalLink from "../../utils/UniversalLink";
import "./PrestigeCollection.css";

const PrestigeCollection = ({ projects }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [slider, setSlider] = useState(null);
  const settings = {
    prevArrow: <br />,
    nextArrow: <br />,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    touchMove: false,
  };

  const handleNextPage = () => {
    if (slider) {
      slider.slickNext();
    }
  };

  const handlePrevPage = () => {
    if (slider) {
      slider.slickPrev();
    }
  };
  return (
    <div className="my-64px">
      <div className="bg-gray-border rounded-b-5px prehomes-container">
        <div className="p-25px md:p-16px">
          <div>
            <div className="flex px-16px flex-col space-y-20px md:space-y-0px md:flex-row justify-between items-center bg-mild-black py-50px md:p-50px rounded-t-5px">
              <StaticImage src="../../assets/prestige/prestige-logo.png" alt="Prestige Logo" />
              <h3 className="text-white text-16px font-poppins font-medium uppercase text-center">
                A collection of ultra-luxury homes from revered developers
              </h3>
            </div>
            <div className="bg-white px-16px py-24px md:p-32px rounded-b-5px">
              <Slider ref={s => setSlider(s)} className="w-full prestige-slider" {...settings}>
                {projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:space-x-50px text-mild-black">
                      <Image image={project.projectHeroImage} className="md:w-2/5 rounded-5px img-shadow" />
                      <div className="md:w-3/5 relative md:mt-0px mt-16px">
                        <h2 className="pt-8px md:pt-0px pb-8px font-late-november">{project.projectName}</h2>
                        <h4 className="text-12px font-pangram font-bold md:font-normal">
                          {project.city.cityName}
                        </h4>
                        <p className="text-14px md:text-16px py-20px font-normal h-164px text-black">
                          {project.projectPreviewShortText}
                        </p>
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="w-1/2 md:w-1/3 order-1">
                            <h4 className="font-pangram text-12px font-bold mb-8px">Pricing from:</h4>
                            <h4 className="font-light">${project.fields.projectMinPrice}</h4>
                          </div>
                          <div className="w-full md:w-1/3 order-3 md:order-2 md:mt-0px mt-16px">
                            <h4 className="font-pangram text-12px font-bold mb-8px">Developer</h4>
                            <h4 className="font-light">{project.developer.developerName}</h4>
                          </div>
                          <div className="w-1/2 md:w-1/3 order-2 md:order-3">
                            <Button
                              variants="outline_thin"
                              btnClasses="w-full font-normal px-16px py-10px border"
                              onClick={() => setIsOpen(true)}
                            >
                              Watch Promo Video
                            </Button>
                            <ModalVideo
                              modalIsOpen={modalIsOpen}
                              setIsOpen={setIsOpen}
                              modalVideoLink={project.overviewVideoLink}
                            />
                          </div>
                        </div>
                        <div className="w-full mt-40px font-pangram text-12px text-mild-purple flex justify-between items-center">
                          <div className="flex items-center cursor-pointer" onClick={handlePrevPage}>
                            <SliderArrow classNames="mr-8px" />
                            View Last
                          </div>
                          <UniversalLink link="/prestige">
                            <span>View All</span>
                          </UniversalLink>
                          <div className="flex items-center cursor-pointer" onClick={handleNextPage}>
                            View Next <SliderArrow classNames="ml-8px" rotate={true} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestigeCollection;

PrestigeCollection.propTypes = {
  projects: PropTypes.array,
};

PrestigeCollection.defaultProps = {
  projects: [],
};
