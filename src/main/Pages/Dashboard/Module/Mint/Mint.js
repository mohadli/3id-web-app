import React, {useState} from 'react';
import classes from './Mint.module.css';
import {images} from "../../../../../assets/images/images";
import {Trans, useTranslation} from "react-i18next";
import Button from "../../../../../components/Button/Button";
import TextInput from "../../../../../components/TextInput/TextInput";

const Mint = () => {

    const {t} = useTranslation();

    const [input, setInput] = useState({
        address: {value: "", error: []},
        domain: {value: "", error: []},
        description: {value: "", error: []},
        suffix: {value: "", error: []},
    });

    const inputHandler = (e) => {
        let errorMessage = []
        let inputVal = e.target.value
        if (typeof e.target.dataset.min !== undefined && e.target.value.length < e.target.dataset.min) {
            errorMessage.push(<Trans
                i18nKey="minInput"
                values={{
                    name: t(e.target.dataset.name),
                    min: e.target.dataset.min
                }}
            />)
        }





        let prevState = {
            ...input,
            [e.target.dataset.name]: {...input[e.target.dataset.name], value: inputVal, error: errorMessage}
        }


        setInput(prevState)
    }

    const domainsList = [
        {value: ".3id.one", label: ".3id.one"},
        {value: ".popns.eth", label: ".popns.eth"},
        {value: ".0-8.eyz", label: ".0-8.eyz"},
    ]

    return (
        <div className={`${classes.container} width-100 column`}>

            <img src={images.appLogo} alt="logo" className={`${classes.appLogo} width-8`} />


            <div className={`row jc-between ai-center my-4`}>
                <span className={`fs-03`}>{t("content")}</span>
                <Button
                    type="submit"
                    buttonClass={`${classes.thisButton} cursor-pointer mb-1 px-2 py-2`}
                    buttonTitle={t('connectWallet')}
                />
            </div>


            <TextInput
                value={input.address.value}
                type="text"
                label={t('address')}
                id="address"
                labelFor="address"
                //placeholder={t('Login.mobilePh')}
                data-name="address"
                data-type="input"
                data-min={2}
                //maxLength="10"
                onchange={(e) => inputHandler(e)}
                alerts={input.address.error}
                inputClass={`width-100 my-1`}
            />
            <TextInput
                value={input.domain.value}
                type="text"
                label={t('domain')}
                id="domain"
                labelFor="domain"
                //placeholder={t('Login.mobilePh')}
                data-name="domain"
                data-type="input"
                data-min={2}
                //maxLength="10"
                onchange={(e) => inputHandler(e)}
                alerts={input.domain.error}
                inputClass={`width-100 my-1`}
                after={<TextInput
                    select={true}
                    /*placeholder={t('PersonalProfile.selectNationality')}*/
                    options={domainsList}
                    defaultValue={domainsList.filter((v) => v.value === input.suffix.value)}
                    inputClass={`width-100`}
                    /*lead={t('PersonalProfile.nationality')}*/
                    type="select"
                    onchange={(e) => setInput({...input, suffix: {value: e.value, error: []}})}
                    alerts={input.suffix.error}
                />}
            />





        </div>
    );
};

export default Mint;
