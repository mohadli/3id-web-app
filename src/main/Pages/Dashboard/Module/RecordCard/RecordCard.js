import React from 'react';
import classes from './RecordCard.module.css';
import RECORDS from "../../../../../utils/RECORDS";
import {isMobile} from "react-device-detect";

const RecordCard = ({title, moreRecords, setMoreRecords}) => {

    const addRecordHandler = () => {
        setMoreRecords({...moreRecords, [title?.toLowerCase()]:{value: "", error: []}})


        /*delete RECORDS[`${title}`];*/
        /*delete RECORDS.title;*/
    }

    return (
        <div className={`${classes.container} ${isMobile ? "width-100" : "width-15"} column jc-center ai-center px-2 py-2 cursor-pointer ml-1 mb-2 rounded-8`} onClick={()=>addRecordHandler()}>
            {title}
        </div>
    );
};

export default RecordCard;
