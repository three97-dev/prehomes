import React from "react";

const SliderArrow = ({ rotate, classNames, onClick, color="#E5E5E5" }) => {
  return (
    <div onClick={onClick} className={`cursor-pointer ${classNames}`}>
      <div className={rotate && "transform rotate-180"}>
        <svg width="20" height="34" viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 3.03342L16.9494 0L0 16.9666L16.9666 33.9332L20 30.8997L6.06684 16.9666L20 3.03342Z"
            fill={color}
          />
        </svg>
      </div>
    </div>
  );
};
export default SliderArrow;
