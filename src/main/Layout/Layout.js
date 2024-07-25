import React from 'react';
import classes from './Layout.module.css';
import {Outlet} from "react-router-dom";
import ScrollBar from "../../components/ScrollBar";
import {useTranslation} from "react-i18next";

const Layout = () => {

    const {t} = useTranslation();
    return (
        <>
            <div className={`${classes.container} column jc-center ai-center`}>
                <div className={`${classes.header} width-100 row jc-center ai-center`}>
                    <div className={`width-70 row jc-between ai-center`}>
                        <span className={`fs-05`}>{t('title')}</span>
                        <div className={`row jc-end ai-center`}>
                            <span className={`hover-text cursor-pointer mr-3`}>{t("why3ID")}</span>
                            <span className={`hover-text cursor-pointer mr-3`}>{t("faq")}</span>
                            <span className={`hover-text cursor-pointer mr-3`}>{t("documations")}</span>
                        </div>
                    </div>
                </div>
                <ScrollBar>
                    <Outlet/>
                </ScrollBar>
            </div>
        </>
    );
};

export default Layout;
