import React from 'react';
import classes from './TextInput.module.css'
import Icons from "../Icon/Icons";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import i18n from "i18next";
import Select from "react-select";

const TextInput = ({inputClass, onchange, label, subLabel, innerRef, textarea, value, icon, alerts, select, selectType, labelFor, datePicker, options, customRef, after, ...props }) => {



   /* const theme = window.env.REACT_APP_DEFAULT_THEME*/

    const selectClickHandler = () => {
        /*setGlobal({
            ...global,
            activeActionSheet: {
                menu: false,
                select: true,
            },
            selectType,
        })*/
    }

    const optionClassHandler = (state) => {
        let className = classes.selectOptions

        if (state.isFocused) {
            className = className + " " + classes.isFocused
        }
        if (state.isSelected) {
            className = className + " " + classes.isSelected
        }

        return className;
    }

    return (
       <div className={`${inputClass}`}>
           <div className={`${classes.inputGroup} ${alerts?.length !== 0 && classes.hasError}`}
                onClick={()=> select ? selectClickHandler() : "" }
           >

               { icon && <i className={`${classes.icon}`}>{icon}</i>}
               <label className={value && classes.hasValue} htmlFor={labelFor}>{label}</label>

               {textarea ? <textarea
                   ref={innerRef}
                   rows={1}
                   onChange={onchange}
                   value={value}
                   {...props}
               /> : datePicker ?
                   <DatePicker
                       /*dataPanelPosition={"Bottom"}*/
                       className={`bg-dark`}
                       /*locale={i18n.language === "fa" ? persian_fa : null}
                       calendar={i18n.language === "fa" ? persian : null}*/
                       onChange={onchange}
                       render={<input className={`${classes.datePicker} ${classes.input}`} readOnly={true}/>}
                       {...props}
                   >
                   </DatePicker> :

                   select ?
                       <Select
                           classNames={{
                               option: (state) => optionClassHandler(state),
                               menuList: () => `${classes.menuList}`,
                               menu: () => `${classes.menu}`,
                           }}
                           onChange={onchange}
                           options={options}
                           ref={customRef}
                           classNamePrefix="select"
                           className={`${classes.selectBox} selectExternalClass`}
                           {...props}
                       /> :
               <input
                   onChange={onchange}
                   value={value}
                   className={`${classes.input}`}
                   {...props}
               />}

               { after && <span className={`after ${classes.after}`}>{after}</span>}




               {/*{alerts?.length !== 0 && <Icons iconName="icon-info-circled flex fs-05 text-red" iconClass={`${classes.thisIcon}`}/>}*/}
           </div>
           {subLabel && <span className={`column fs-0-9 mt-05`}>
               {subLabel}
           </span>}
           <div className={`column text-red mt-1`}>
               {alerts?.map((alert, index) => <span key={index} className={`pr-05 `}>{alert}</span>)}
           </div>
       </div>


    );
};

export default TextInput;
