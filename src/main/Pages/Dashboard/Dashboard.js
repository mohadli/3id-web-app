import React from 'react';
import classes from './Dashboard.module.css'
import Mint from "./Module/Mint/Mint";
import Domains from "./Module/Domains/Domains";
import HowItWorks from "./Module/HowItWorks/HowItWorks";
import Why3ID from "./Module/Why3ID/Why3ID";

const Dashboard = () => {
    return (
        <div className={`${classes.container} width-70 m-auto py-5`}>
            <Mint/>

            <Domains/>
            <HowItWorks/>
            <Why3ID/>

            <div className={`my-10`} style={{height: "100vh"}}/>

        </div>
    );
};

export default Dashboard;
