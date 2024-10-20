import React from 'react';
import classes from './Domains.module.css';
import {useGetDomains} from "../../../../../query";
import Title from "../../../../../components/Title/Title";
import {useTranslation} from "react-i18next";
import {isMobile} from "react-device-detect";
const Domains = () => {

    const {t} = useTranslation();

    const {data, isLoading, error} = useGetDomains()

 /*   console.log("data", data)
    console.log("Object?.keys(data)?.length", Object?.keys(data)?.length)*/

    if (isLoading) return false

    return (
        <div className={`${classes.container} width-100 column my-10`}>

            <Title title={t("recent")}/>

            {/*<span>{Object?.keys(data)?.length}</span>*/}

            <div className={`${classes.content} row py-10 fs-02`}>

                {
                    Object.keys(data)
                        .reverse()
                        .map((name, index) => (
                            <div className={`${isMobile ? "ml-5" : "ml-2"}`} key={index}>
                                {name.slice(0, name.indexOf("."))}
                                <span className={`${classes.prefix}`}>{name.slice(name.indexOf("."))}</span>
                            </div>
                        ))
                }
            </div>

        </div>
    );
};

export default Domains;
