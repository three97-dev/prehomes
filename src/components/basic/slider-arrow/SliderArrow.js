import React from "react";

const SliderArrow = ({ rotate, classNames, onClick }) => {
  return (
    <div onClick={onClick} className={`${classNames} z-30 h-65px w-65px cursor-pointer flex justify-center`}>
      <div onClick={onClick} className={`my-auto`}>
        <div className={rotate && "transform rotate-180"}>
          <svg width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 29V3L2 16L19 29Z"
              fill="#B9A4E8"
              stroke="#B9A4E8"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="square"
            />
            <path d="M24 2V30" stroke="#B9A4E8" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default SliderArrow;
