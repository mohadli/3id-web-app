import React from 'react';
import classes from './Why3ID.module.css';
import Title from "../../../../../components/Title/Title";
import {useTranslation} from "react-i18next";

const Why3ID = () => {
    const {t} = useTranslation();

    return (
        <div className={`${classes.container} width-100 column my-10`} id="why3ID">
            <Title title={t("why3ID")}/>
            <div className={`${classes.content} mt-7 text-center`}>
                {t("why3IDContent")}
            </div>
        </div>
    );
};

export default Why3ID;
