import React from "react";

const DropdownArrow = ({ classNames, color = "#212121" }) => {
  return (
    <div className={classNames}>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L5 5L10 0H0Z" fill={color} />
      </svg>
    </div>
  );
};

export default DropdownArrow;
