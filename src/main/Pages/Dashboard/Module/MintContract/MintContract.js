import React, {useEffect} from 'react';
import { useReadContract } from 'wagmi'
import {abi} from "../../../../../utils/contract-abi";
import web3 from "web3";


const MintContract = () => {

    const contractConfig = {
        address: '0x4f88Ea0AE5d48ce348CD88812E43aEfD005ed1B8',
        abi,
    };

    const {data,error }   = useReadContract({
        ...contractConfig,
        functionName: 'getFee',
        args: ['3idone.eth'],
    })

    useEffect(()=>{
        //console.log(ethers.utils.formatEther(data))
        if (data) console.log(web3.utils.fromWei(web3.utils.toNumber(data),'ether'))

    },data)

    return (
        <div>

        </div>
    );
};

export default MintContract;
