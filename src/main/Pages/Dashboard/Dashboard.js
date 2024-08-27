import React from 'react';
import classes from './Dashboard.module.css'
import Mint from "./Module/Mint/Mint";
import Domains from "./Module/Domains/Domains";
import HowItWorks from "./Module/HowItWorks/HowItWorks";
import Why3ID from "./Module/Why3ID/Why3ID";
import FAQ from "./Module/FAQ/FAQ";
import {isMobile} from "react-device-detect";

const Dashboard = () => {
    return (
        <div className={`${classes.container} ${isMobile ? "width-75" : "width-70"}  m-auto py-5`}>
            <Mint/>

            <Domains/>
            <HowItWorks/>
            <Why3ID/>
            <FAQ/>
        </div>
    );
};

export default Dashboard;
