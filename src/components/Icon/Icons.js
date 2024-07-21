import React from "react";

const Icons = ({iconClass, iconName, onClick}) => {
  return (
    <span className={iconClass} onClick={onClick}>
      <i className={iconName} />
    </span>
  );
};

export default Icons;
