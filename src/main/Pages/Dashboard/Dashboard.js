import React from 'react';
import classes from './Dashboard.module.css'
import Mint from "./Module/Mint/Mint";

const Dashboard = () => {
    return (
        <div className={`${classes.container} width-70 m-auto py-5`}>
            <Mint/>

        </div>
    );
};

export default Dashboard;
