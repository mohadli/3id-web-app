import React from 'react';
import classes from './RecordInput.module.css';
import TextInput from "../../../../../components/TextInput/TextInput";
import {capitalizeFirstLetter} from "../../../../../utils/utils";

const RecordInput = ({data, name, onchange}) => {
    return (
        <TextInput
            value={data?.value}
            type="text"
            label={capitalizeFirstLetter(name)}
            id={name}
            labelFor={name}
            //placeholder={t('Login.mobilePh')}
            data-name={name}
            data-type="input"
            data-min={2}
            //maxLength="10"
            onchange={(e) => onchange(e)}
            alerts={data?.error}
            inputClass={`width-32 my-1 ml-1`}
        />
    );
};

export default RecordInput;
