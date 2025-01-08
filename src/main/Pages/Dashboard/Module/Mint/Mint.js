import React, {useEffect, useState} from 'react';
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
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {
    useAccount,
    useChainId,
    useEnsAvatar,
    useEnsName,
    useReadContract,
    useSignMessage,
    useWriteContract
} from "wagmi";
import { abi } from '../../../../../utils/contract-abi';
import web3 from "web3";
import {toast} from "react-hot-toast";
import {isMobile} from "react-device-detect";
import {useDebounce} from "../../../../../Hooks/hooks/useDebounce.ts";
import {useFetch} from "../../../../../Hooks/hooks/useFetch.ts";
import {addToDb} from "../../../../../api/api";
import {useGetDomains} from "../../../../../query";



const Mint = () => {

    const {t} = useTranslation();

    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { isConnected } = useAccount()
    const chainId = useChainId()

    console.log("config", chainId)


    const {refetch:refetchDomains} = useGetDomains()

    let { data, variables, signMessage } = useSignMessage({})

    const optimismAddress = process.env.REACT_APP_OPTIMISM_CONTRACT_ADDRESS;
    const lineaAddress = process.env.REACT_APP_LINEAMAINNET_CONTRACT_ADDRESS;

    const getContractAddress = () => {
        if (chainId === 10) { // Optimism
            return optimismAddress;
        } else if (chainId === 59144) { // Linea
            return lineaAddress;
        } else {
            throw new Error("Unsupported chain ID");
        }
    };



    const contractConfig = {
        address: getContractAddress(),
        abi,
    };

    console.log("Contract Config:", contractConfig);


    let {data: hash,
        writeContract: mint,
        isPending: isMintPending,
        isSuccess: isSuccess,
        error: mintError,
    } = useWriteContract();




/*    useEffect(()=>{

        if (hash !== undefined) {

        }

    },[isSuccess])

    useEffect(()=>{

        if (mintError) {

        }

    },[mintError])*/

   /* useEffect(()=>{

        if (isMintPending) {
            toast(t("pending"))
        }

    },[isMintPending])*/

    /*console.log("address", address)
    console.log("isConnected", isConnected)
    console.log("data", data)
    console.log("variables", variables)*/

    const [loading, setLoading] = useState(false)

    const [showRecords, setShowRecords] = useState(false)
    const [resolver, setResolver] = useState("onchain")

    const [input, setInput] = useState({
        address: {value: "", error: []},
        domain: {value: "", error: []},
        description: {value: "", error: []},
        suffix: {value: "", error: []},
    });


    useEffect(()=>{
        setInput({
            address: {value: "", error: []},
            domain: {value: "", error: []},
            description: {value: "", error: []},
            suffix: {value: "", error: []},
        })
    }, [chainId])

    const {data: readContractData , error:readContractError, refetch }   = useReadContract({
        ...contractConfig,
        functionName: 'getFee',
        enabled: false,
        args: [input?.suffix?.value],
    })

    const [moreRecords, setMoreRecords] = useState({});

    const regex = new RegExp('^[a-z0-9-]+$')
    const debouncedName = useDebounce(input?.domain?.value, 500)
    const enabled = !!debouncedName && regex.test(debouncedName)


    /*const requestBody = {
        name: `${debouncedName}.${input?.suffix?.value}`,
        owner: address,
        addresses: { '60': input?.address?.value },
        texts: { description:input?.description?.value, 'com.github' : moreRecords?.github?.value, 'com.linkedin ' : moreRecords?.linkedin ?.value, 'com.twitter ' : moreRecords?.twitter ?.value, 'com.telegram ' : moreRecords?.telegram ?.value },
        signature: {
            hash: data,
            message: variables?.message,
        },
    };


    const {
        data: gatewayData,
        error: gatewayError,
        isLoading: gatewayIsLoading,
    } = useFetch(
        data ? 'https://ens-gateway.popns.workers.dev/set' : null,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }
    );

    useEffect(()=>{

        console.log("in useeffect")

        if (gatewayData) data = null

    },[gatewayData])
*/

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

    const isFormValid = () => {
        let inputs = {...input}

        const hasError = Object.values(input).find(input => input.error.length > 0)
        if (hasError) return false
        let isEmpty = false

        for (const key in inputs) {

            if (inputs[key].value.length === 0) {
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key]: {
                        ...inputs[key],
                        error: [<Trans
                            i18nKey="emptyInput"
                            values={{
                                name: t(key),
                            }}
                        />]
                    }
                }
            }
        }

        setInput(inputs);
        return !isEmpty;
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

    const ismoreRecordsFormValid = () => {
        let inputs = {...moreRecords}

        const hasError = Object.values(moreRecords).find(moreRecords => moreRecords.error.length > 0)
        if (hasError) return false
        let isEmpty = false

        for (const key in inputs) {

            if (inputs[key].value.length === 0) {
                isEmpty = true
                inputs = {
                    ...inputs,
                    [key]: {
                        ...inputs[key],
                        error: [<Trans
                            i18nKey="emptyInput"
                            values={{
                                name: t(key),
                            }}
                        />]
                    }
                }
            }
        }

        setMoreRecords(inputs);
        return !isEmpty;
    }

    const domainsList = [
        {value: "3idone.eth", label: "3idone.eth"},
        {value: "one3id.eth", label: "one3id.eth"},
        /*{value: "3id.one", label: "3id.one"},
        {value: "popns.eth", label: "popns.eth"},
        {value: "0-8.eyz", label: "0-8.eyz"},*/
    ]

    const getFilteredDomains = () => {
        if (chainId === 10) {
            return domainsList.filter((domain) => domain.value === "3idone.eth");
        } else if (chainId === 59144) {
            return domainsList.filter((domain) => domain.value === "one3id.eth");
        }
        return [];
    };

    /*if (Object.keys(moreRecords).length > 0) {
        Object.keys(moreRecords).map( (m) =>  console.log(moreRecords[m]?.value))

        /!*console.log("m", m),*!/

    }

*/

    const submit = async () => {

        if (!isFormValid()) return false;
        if (!ismoreRecordsFormValid()) return false;

        setLoading(true)

       /* const dataToSign = JSON.stringify({
            address: input?.address?.value,
            domain: input?.domain?.value + input?.prefix?.value,
            description: input?.description?.value,
        });*/


        /*Object.keys(mergeDataToSign).map( (data) => {
            dataToSign.entries({
                data: mergeDataToSign[data].value
            })
        })*/

        let mergeDataToSign = {...input, ...moreRecords}
        let dataToSign = {}

        for (let key in mergeDataToSign) {
            dataToSign[key] = mergeDataToSign[key].value;
        }




        if (resolver === "offchain") {
            signMessage?.({
                message: `Register ${debouncedName}.${input?.suffix?.value}`}, {
                onError: (error)=>{
                    console.log("error", error);

                    toast.error(t("serverError"))
                    setLoading(false)
                },
                onSuccess: async (success)=>{
                    console.log("success", success);
                    console.log("in mint FUNC offchain")
                    const requestBody = {
                        name: `${debouncedName}.${input?.suffix?.value}`,
                        owner: address,
                        addresses: { '60': input?.address?.value },
                        texts: { description:input?.description?.value, 'com.github' : moreRecords?.github?.value, 'com.linkedin ' : moreRecords?.linkedin ?.value, 'com.twitter ' : moreRecords?.twitter ?.value, 'com.telegram ' : moreRecords?.telegram ?.value },
                        signature: {
                            hash: success,
                            message: `Register ${debouncedName}.${input?.suffix?.value}`,
                        },
                    };
                    await addToDb(requestBody).then((res)=>{
                        toast.success(t("mintSuccessfully"))
                        setInput({
                            address: {value: "", error: []},
                            domain: {value: "", error: []},
                            description: {value: "", error: []},
                            suffix: {value: input?.suffix?.value, error: []},
                        })
                        setMoreRecords({})
                        setLoading(false)
                        refetchDomains()
                    }).catch((err)=>{
                        toast.error(t("serverError"))
                        setLoading(false)
                    })
                }
            })
        }

        if (resolver === "onchain") {
            signMessage?.({
                message: `Register ${debouncedName}.${input?.suffix?.value}`}, {
                onError: (error)=>{
                    console.log("error", error);
                    toast.error(t("serverError"))
                    setLoading(false)
                },
                onSuccess: async (success)=>{
                    console.log("success", success);
                    console.log("in mint FUNC offchain")
                    const requestBody = {
                        name: `${debouncedName}.${input?.suffix?.value}`,
                        owner: address,
                        addresses: { '60': input?.address?.value },
                        texts: { description:input?.description?.value, 'com.github' : moreRecords?.github?.value, 'com.linkedin ' : moreRecords?.linkedin ?.value, 'com.twitter ' : moreRecords?.twitter ?.value, 'com.telegram ' : moreRecords?.telegram ?.value },
                        signature: {
                            hash: success,
                            message: `Register ${debouncedName}.${input?.suffix?.value}`,
                        },
                    };
                    await addToDb(requestBody).then((res)=>{

                        mint?.({
                            ...contractConfig,
                            functionName: 'mintSubdomain',
                            args: [ input?.address?.value, input?.domain?.value+"."+input?.suffix?.value],
                            value: readContractData
                        },{
                            onError: (error)=>{
                                console.log("in mint FUNC onchain error", error)
                                console.log("in error")

                                toast.error(error?.shortMessage)
                                setLoading(false)
                            },
                            onSuccess: (success)=>{
                                toast.success(t("mintSuccessfully"))
                                console.log("in mint FUNC onchain success", success)
                                console.log("in success")
                                setInput({
                                    address: {value: "", error: []},
                                    domain: {value: "", error: []},
                                    description: {value: "", error: []},
                                    suffix: {value: input?.suffix?.value, error: []},
                                })
                                setMoreRecords({})
                                setLoading(false)
                                refetchDomains()
                            }
                        })

                    }).catch((err)=>{
                        toast.error(t("serverError"))
                        setLoading(false)
                    })
                }
            })
        }




    }


    return (
        <div className={`${classes.container} width-100 ${isMobile ? "column jc-center ai-center" : "" }`}>




            <div className={`${isMobile ? "column" : "row"} jc-between ai-center mb-4`}>
                <span className={`fs-08 ${isMobile ? "mb-3" : ""}`}>{t("content")}</span>
                {/*<Button
                    type="submit"
                    buttonClass={`${classes.thisButton} cursor-pointer mb-1 px-2 py-2`}
                    buttonTitle={t('connectWallet')}
                />*/}

                <ConnectButton />
            </div>

            {/*<div>
                {Number(config)}
            </div>*/}


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
                after={
                    <TextInput
                        select={true}
                        options={getFilteredDomains()} // فیلتر کردن گزینه‌ها
                        defaultValue={getFilteredDomains().filter((v) => v.value === input.suffix.value)}
                        inputClass={`width-100`}
                        type="select"
                        onchange={(e) => setInput({...input, suffix: {value: e.value, error: []}})}
                        alerts={input.suffix.error}
                    />
                }
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


            <div className={`row jc-start ai-start wrap ${isMobile ? "mt-2" : "mt-5"} width-100 ${classes.recordsContainer}`}>
                {
                    Object.keys(moreRecords).map( key => <RecordInput data={moreRecords[key]} name={key} onchange={moreRecordsHandler} key={key}/>)
                }
            </div>



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

            <div className={`row jc-between ai-center mt-3 mb-2 wrap`}>
                <ResolverCard type={t("onchain")} fee={readContractData ? web3.utils.fromWei(web3.utils.toNumber(readContractData),'ether')+ " ETH" : "---" } active={resolver} setResolver={setResolver}/>
                <ResolverCard type={t("offchain")} fee={"Free"} active={resolver} setResolver={setResolver}/>
            </div>


            <div className={`row jc-between ai-center my-4 width-100`}>

                <Button
                    type="button"
                    buttonClass={`${classes.thisButton} cursor-pointer mb-1  py-2 width-100`}
                    buttonTitle={loading ? "Loading..." : t('mint')}
                    onClick={()=>submit()}
                    disabled={loading || !isConnected}
                />
            </div>




        </div>
    );
};

export default Mint;
