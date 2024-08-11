import React, {useState} from 'react';
import classes from './Mint.module.css';
import {images} from "../../../../../assets/images/images";
import {Trans, useTranslation} from "react-i18next";
import Button from "../../../../../components/Button/Button";
import TextInput from "../../../../../components/TextInput/TextInput";
import Icon from "../../../../../components/Icon/Icon";
import RECORDS from "../../../../../utils/RECORDS";
import RecordCard from "../RecordCard/RecordCard";
import RecordInput from "../RecordInput/RecordInput";
import ResolverCard from "../ResolverCard/ResolverCard";

const Mint = () => {

    console.log("type of records", RECORDS);

    const {t} = useTranslation();

    const [showRecords, setShowRecords] = useState(false)
    const [resolver, setResolver] = useState("onchain")

    const [input, setInput] = useState({
        address: {value: "", error: []},
        domain: {value: "", error: []},
        description: {value: "", error: []},
        suffix: {value: "", error: []},
    });

    const [moreRecords, setMoreRecords] = useState({});

    console.log("Object.keys(moreRecords) ", Object.keys(moreRecords) )
    console.log("RECORDS ", RECORDS )

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
    const moreRecordsHandler = (e) => {
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
            ...moreRecords,
            [e.target.dataset.name]: {...moreRecords[e.target.dataset.name], value: inputVal, error: errorMessage}
        }
        setMoreRecords(prevState)
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
                data-name="domain"
                data-type="input"
                data-min={2}
                //maxLength="10"
                onchange={(e) => inputHandler(e)}
                alerts={input.domain.error}
                inputClass={`width-100 my-1`}
                after={<TextInput
                    select={true}
                    options={domainsList}
                    defaultValue={domainsList.filter((v) => v.value === input.suffix.value)}
                    inputClass={`width-100`}
                    type="select"
                    onchange={(e) => setInput({...input, suffix: {value: e.value, error: []}})}
                    alerts={input.suffix.error}
                />}
            />


            <div className={`row jc-between ai-center mt-10 mb-2`}>
                <span className={`fs-05`}>{t("records")}</span>
                {/*<Button
                    type="button"
                    buttonClass={`${classes.moreButton} cursor-pointer mb-1 px-2 py-2`}
                    buttonTitle={<div className={`row jc-center ai-center`}>
                        <Icon
                            iconName={`icon-plus-1 fs-02 flex`}
                            iconClass={`ml-05`}
                        />
                        <span className={`mr-05`}>{t('addMoreRecords')}</span>
                    </div>}
                />*/}
            </div>

            <TextInput
                value={input.description.value}
                type="text"
                label={t('description')}
                id="description"
                labelFor="description"
                data-name="description"
                data-type="input"
                data-min={2}
                //maxLength="10"
                onchange={(e) => inputHandler(e)}
                alerts={input.description.error}
                inputClass={`width-100 my-1`}
            />

            {
                Object.keys(moreRecords).map( key => <RecordInput data={moreRecords[key]} name={key} onchange={moreRecordsHandler} key={key}/>)
            }

            <div className={`row jc-between ai-center mt-5`}>
                <Button
                    type="button"
                    buttonClass={`${classes.moreButton} cursor-pointer mb-1 px-2 py-2`}
                    buttonTitle={<div className={`row jc-center ai-center`}>
                        <Icon
                            iconName={`icon-plus-1 fs-02 flex`}
                            iconClass={`ml-05`}
                        />
                        <span className={`mr-05`}>{t('addMoreRecords')}</span>
                    </div>}
                    onClick={()=> setShowRecords(prevState => !prevState)}
                />
            </div>



            { showRecords && <div className={`row jc-start ai-center my-2 wrap`}>
                { RECORDS?.map(r => ( <RecordCard title={r} moreRecords={moreRecords} setMoreRecords={setMoreRecords} key={r}/>) )}
            </div>}

            <div className={`row jc-between ai-center mt-10 mb-2`}>
                <span className={`fs-05`}>{t("resolver")}</span>
            </div>

            <div className={`row jc-between ai-center mt-3 mb-2`}>
                <ResolverCard type={t("onchain")} fee={"0.001 ETH"} active={resolver} setResolver={setResolver}/>
                <ResolverCard type={t("offchain")} fee={"Free"} active={resolver} setResolver={setResolver}/>
            </div>


            <div className={`row jc-between ai-center my-4`}>
                <Button
                    type="submit"
                    buttonClass={`${classes.thisButton} cursor-pointer mb-1 px-2 py-2 width-100`}
                    buttonTitle={t('mint')}
                />
            </div>




        </div>
    );
};

export default Mint;
