import React, {useEffect} from 'react';
import i18n from "i18next";
import "./Styles/mobile.css";
import "./Styles/Browser.css";

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
        <div className={`height-100 width-100 row jc-center ai-center fs-50`} style={{height: '100vh',}}>

            3 ID

        </div>
    );
};

export default Main;
