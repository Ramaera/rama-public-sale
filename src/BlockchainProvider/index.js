import React,{useEffect,useState} from "react";
import TOKEN_ABI from "../config/ABI/tokenABI.json"
import MLM_ABI from "../config/ABI/mlmABI.json"
import EXCHANGE_ABI from "../config/ABI/exchangeABI.json"

import { useWallet } from "use-wallet";
import Web3 from "web3";
import config from "../config";
const BlockchainProvider = (props)=>{
    const [web,setWeb3] = useState();

    const [tokenContract,setTokenContract] = useState();
    const [mlmContract,setMlmContract] = useState();
    const [exchangeContract,setExchangeContract] = useState();

    const wallet = useWallet()

    useEffect(()=>{
        initContractData();
    },[])


    const initContractData  =()=>{

        const _web3 = new Web3(Web3.givenProvider 
            || "http://localhost:8545")


        const _tokenContract = new _web3.eth.Contract(TOKEN_ABI,
             config.TOKEN_ADDRESS)

        const _exchangeContract = new _web3.eth.Contract(EXCHANGE_ABI,
                config.EXCHANGE)

        const _mlmContract = new _web3.eth.Contract(MLM_ABI,
                config.MLM_ADDRESS)
        setWeb3(_web3);

        setTokenContract(_tokenContract);
        setMlmContract(_mlmContract);
        setExchangeContract(_exchangeContract);

        props.onContractsLoaded({tokenContract:_tokenContract,
            exchangeContract:_exchangeContract,
            mlmContract: _mlmContract})

        
        // let _tokenContract = new  Web3
    }


    return <></>
}

export default BlockchainProvider;