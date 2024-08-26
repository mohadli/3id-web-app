import React from 'react';
import classes from './Title.module.css';
import {isMobile} from "react-device-detect";

const Title = ({title}) => {
    return (
        <div class={`${classes.container} row jc-between ai-center width-100`}>
            <span class={`${classes.line} ${isMobile ? "width-30" : "width-40"}`}/>
            <span>{title}</span>
            <span class={`${classes.line} ${isMobile ? "width-30" : "width-40"}`}/>
        </div>
    );
};

export default Title;
