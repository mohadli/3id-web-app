import React from 'react';
import classes from './HowItWorks.module.css';
import {useTranslation} from "react-i18next";
import Title from "../../../../../components/Title/Title";

const HowItWorks = () => {

    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-100 column my-10`}>

            <Title title={t("HowItWorks")}/>


        </div>
    );
};

export default HowItWorks;
