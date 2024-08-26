import React from "react";

const Icon = ({iconClass, iconName, onClick}) => {
  return (
    <span className={iconClass} onClick={onClick}>
      <i className={iconName} />
    </span>
  );
};

export default Icon;
