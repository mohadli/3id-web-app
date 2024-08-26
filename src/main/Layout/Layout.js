import React from 'react';
import classes from './Layout.module.css';
import {Link, Outlet} from "react-router-dom";
import ScrollBar from "../../components/ScrollBar";
import {useTranslation} from "react-i18next";

const Layout = () => {

    const {t} = useTranslation();

    const documationUrl = process.env.REACT_APP_DOCUMATIONS_URL

    return (
        <>
            <div className={`${classes.container} column jc-center ai-center`}>
                <div className={`${classes.header} width-100 row jc-center ai-center`}>
                    <div className={`width-70 row jc-between ai-center`}>
                        <span className={`fs-05`}>{t('title')}</span>
                        <div className={`row jc-end ai-center`}>
                            <a href={"#why3ID"} className={`hover-text cursor-pointer mr-3`} >{t("why3ID")}</a>
                            <a href={"#FAQ"} className={`hover-text cursor-pointer mr-3`}>{t("faq")}</a>
                            <span className={`hover-text cursor-pointer mr-3`}
                                  onClick={()=>window.open("https://3id-one.gitbook.io/")}
                            >{t("documations")}</span>
                        </div>
                    </div>
                </div>
                <ScrollBar>
                    <Outlet/>
                    <div className={`${classes.footer} width-100 row jc-center ai-center`}>
                        <span>{t("copyrightText")} <span className={`mx-05`}>|</span> {t("title")}</span>
                    </div>
                </ScrollBar>


            </div>
        </>
    );
};

export default Layout;
