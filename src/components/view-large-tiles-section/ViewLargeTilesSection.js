import React, { useState, useCallback } from "react";
import Slider from "react-slick";

import LargeTile from "../large-tile/LargeTile";
import SliderArrow from "../basic/slider-arrow/SliderArrow";

const ViewLargeTilesSection = ({ title, tiles }) => {
  const [slider, setSlider] = useState(null);
  const [tileCount, setTileCount] = useState(0);

  const settings = {
    prevArrow: <SliderArrow classNames="small-tile-prev-arrow py-8px px-8px bg-white" />,
    nextArrow: <SliderArrow rotate={true} classNames="small-tile-next-arrow py-8px px-8px bg-white" />,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    touchMove: false,
    onInit: useCallback(() => {
      if (slider) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, setTileCount]),
    onReInit: useCallback(() => {
      if (slider.innerSlider.props.slidesToShow !== tileCount) {
        setTileCount(slider.innerSlider.props.slidesToShow);
      }
    }, [slider, tileCount, setTileCount]),
    responsive: [
      {
        breakpoint: 833,
        settings: {
          slidesToShow: 1,
          arrows: false,
          touchMove: true,
          swipeToSlide: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const largeTiles = tiles.map((tile, index) => (
    <LargeTile
      key={index}
      link={tile.fields.pageUrl}
      image={tile.projectTypePreviewImage}
      title={tile.name}
      description={tile.descriptionText}
    />
  ));

  return (
    <div className="bg-light-gray md:px-90px">
      <h2 className="text-black-gray pl-25px md:pl-35px pt-50px lg:pt-85px pb-50px lg:pb-60px">{title}</h2>
      <Slider ref={s => setSlider(s)} {...settings} className="relative pb-43px lg:pb-50px">
        {largeTiles}
      </Slider>
    </div>
  );
};

export default ViewLargeTilesSection;
