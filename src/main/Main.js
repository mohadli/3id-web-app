import React, {useEffect} from 'react';
import i18n from "i18next";
import "./Styles/mobile.css";
import "./Styles/Browser.css";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout";
import * as RoutesName from "./Routes/routes";
import Dashboard from "./Pages/Dashboard/Dashboard";


const Main = () => {


    useEffect(() => {
        document.title = process.env.REACT_APP_TITLE;
    }, [])

    useEffect(() => {
        //const impersonate = query.get("impersonate");
        //dispatch(loadConfig(impersonate))
        i18n.language !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        i18n.on("languageChanged", (lng) => {
            lng !== "fa" ? document.body.classList.add('ltr') : document.body.classList.remove('ltr');
        });
    }, []);


    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path={RoutesName.Dashboard} element={<Dashboard/>}/>

            </Route>
            {/*<Route path="*" element={<Missing/>}/>*/}
        </Routes>
    );
};

export default Main;
