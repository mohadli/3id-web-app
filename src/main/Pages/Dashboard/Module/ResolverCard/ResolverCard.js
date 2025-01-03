import React from 'react';
import classes from './ResolverCard.module.css';
import Icon from "../../../../../components/Icon/Icon";
import {isMobile} from "react-device-detect";

const ResolverCard = ({type, fee, active, setResolver}) => {
    return (
        <div className={`${classes.container} ${ type === active && classes.active} row jc-between ai-center ${isMobile ? 'width-100' : 'width-48'} px-2 py-2 rounded-8 cursor-pointer my-1`}
            onClick={()=>setResolver(type)}
        >
            <div className={`row jc-start ai-center`}>
                <Icon
                    iconName={`${ type === active ? 'icon-record' : 'icon-record-outline'} fs-06 flex`}
                    iconClass={`ml-05`}
                />
                <span className={`mr-05`}>{type}</span>
            </div>
            <span>{fee}</span>
        </div>
    );
};

export default ResolverCard;
