import React from "react";

const SliderArrow = ({ rotate, classNames, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${classNames} z-30 h-65px w-65px cursor-pointer flex justify-center rounded-full`}
    >
      <div onClick={onClick} className={`my-auto`}>
        <div className={rotate && "transform rotate-180"}>
          <svg width="15" height="25" viewBox="0 0 20 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 3.03342L16.9494 0L0 16.9666L16.9666 33.9332L20 30.8997L6.06684 16.9666L20 3.03342Z"
              fill="#202020"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default SliderArrow;
