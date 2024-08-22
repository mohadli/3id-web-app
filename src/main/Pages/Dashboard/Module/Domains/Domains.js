import React from 'react';
import classes from './Domains.module.css';
import {useGetDomains} from "../../../../../query";
const Domains = () => {

    const {data, isLoading, error} = useGetDomains()

    console.log("data", data)
    console.log("Object?.keys(data)?.length", Object?.keys(data)?.length)

    return (
        <div className={`${classes.container} width-100 column`}>
            {
                Object?.keys(data)?.map((name) => <div>{name} </div>)
            }
        </div>
    );
};

export default Domains;
