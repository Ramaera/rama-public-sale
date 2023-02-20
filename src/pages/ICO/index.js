import React, { useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import Header from "../../components/Header";
import ERC20 from "../../config/ABI/tokenABI.json"
import EXCHANGE_ABI from "../../config/ABI/exchangeABI.json"

import config from "../../config"

import Web3 from "web3";

const BUSDLogo = (props) => {

  const wallet = useWallet()
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" {...props}>
      <script />
      <script />
      <circle cx={4.5} cy={4.5} r={4.5} fill="#323232" />
      <path
        fill="#f3ba2f"
        d="M3.744 6.897L6.9 3.741l.762.762-3.156 3.156zm1.953-4.358L2.544 5.702l.759.759 3.153-3.163-.759-.759zm-3.153.759l1.96-1.96.76.758-1.962 1.96zM1.342 4.5l.769-.768.758.758-.768.769z"
      />
      <script />
    </svg>
  );
};
function ICO({onlyBuy}) {
  const wallet = useWallet();
  const [approval, setApproval] = useState(0);
  const [isLoading, setLoading] = useState(false);
  
  const [ramaApproval, setRamaApproval] = useState(0);

  const [busdBalance, setBusdBalance] = useState();
  const [rmstBalance, setRMSTBalance] = useState();

  const [busdContract, setBusdContract] = useState()
  const [ramaContract, setRamaContract] = useState()
  const [exchangeContract, setExchangeContract] = useState()

  const [buyPrice, setBuyPrice] = useState("0.1");
  const [sellPrice, setSellPrice] = useState();

  const [rmsAmount, setRmsAmount] = useState();
  const [busdAmount, setBUSDAmount] = useState();

  const [sellState, setsellState] = useState(false);

  const handleApproval = async (isRama) => {


    setLoading(true)


    try {

      if(isRama){
        await ramaContract.methods.approve(config.EXCHANGE, Web3.utils.toWei("1000000000000000000")).send({ from: wallet.account })

      }else{
        await busdContract.methods.approve(config.EXCHANGE, Web3.utils.toWei("1000000000000000000")).send({ from: wallet.account })

      }

      loadContactData()
    } catch (err) {

    }
    setLoading(false)

  }


  const handleBuy = async () => {


    setLoading(true)


    try {

      await exchangeContract.methods.buyToken(Web3.utils.toWei(busdAmount.toString())).send({ from: wallet.account })
      setBUSDAmount(0)
      setRmsAmount(0)
      loadContactData()
    } catch (err) {
      console.log("errr", err)
    }
    setLoading(false)

  }

  const handleSell = async() => {


    setLoading(true)


    try {

      await exchangeContract.methods.sellToken(Web3.utils.toWei(rmsAmount.toString())).send({ from: wallet.account })
      setBUSDAmount(0)
      setRmsAmount(0)
      loadContactData()
    } catch (err) {
      console.log("errr", err)
    }
    setLoading(false)

  }


  const calculateBUSDToRAMAAmount = (amount) => {
    let finalAmount = amount / buyPrice;
    setRmsAmount(finalAmount);
    setBUSDAmount(amount);
  };

  const calculateRAMAToBUSDAmount = (amount) => {
    let finalAmount = amount * sellPrice;
    setBUSDAmount(finalAmount);
    setRmsAmount(amount);
  };


  const renderButton = () => {
    if (wallet.account) {
      if (sellState) {
        if(ramaApproval>0){
          return (
            <button onClick={() => {
              handleSell()
            }} className="text-white font-bold w-100">
              Sell
            </button>
          )
        }else{
          return (
            <button
              className="text-white font-bold w-100"
              onClick={() => {
                handleApproval(true);
              }}
            >
              {isLoading ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Approve Contract"
              )}
            </button>
          );
        }
       
      }else if (approval > 0) {
        return (
          <button
            onClick={() => {
              handleBuy();
            }}
            className="text-white font-bold w-100">
            {isLoading ? (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Buy"
            )}
          </button>
        );
      } else {
        return (
          <button
            className="text-white font-bold w-100"
            onClick={() => {
              handleApproval();
            }}
          >
            {isLoading ? (
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Approve Contract"
            )}
          </button>
        );
      }
    } else {
      return (
        <button
          className="text-white font-bold w-100"
          onClick={() => {
            wallet.connect();
          }}
        >
          Connect Wallet
        </button>
      );
    }
  };

  useEffect(() => {

    if (wallet.account && wallet.ethereum) {
      loadContactData()
    }

    console.log("point", wallet.account, wallet.ethereum)
  }, [wallet.account && wallet.ethereum])


  useEffect(() => {
    setInterval(() => {
      if (busdContract) {
        loadContactData()
      }
    }, 2000)
  }, [])

  const loadContactData = async () => {
    let web3;
    if (wallet.ethereum) {
      web3 = new Web3(wallet.ethereum);

    } else {
      web3 = new Web3(Web3.givenProvider);

    }
    // let _busdContract = new web3.eth.Contract(ERC20, config.BUSD);
    // let _ramaContract = new web3.eth.Contract(ERC20, config.TOKEN_ADDRESS);
    // let _exchangeContract = new web3.eth.Contract(EXCHANGE_ABI, config.EXCHANGE);
    // let _buyPrice = await _exchangeContract.methods.buyPrice().call()
    // let _sellPrice = await _exchangeContract.methods.sellPrice().call()

    // setBusdContract(_busdContract)
    // setRamaContract(_ramaContract);
    // setExchangeContract(_exchangeContract);

    // let allowance = await _busdContract.methods.allowance(wallet.account, config.EXCHANGE).call();
    // let ramaAllowance = await _ramaContract.methods.allowance(wallet.account, config.EXCHANGE).call();

    // let _balance = await _busdContract.methods.balanceOf(wallet.account).call()
    // let _ramaBalance = await _ramaContract.methods.balanceOf(wallet.account).call()


    // console.log("alloa", allowance)
    // setApproval(parseInt(allowance))

    // setRamaApproval(parseInt(ramaAllowance))

    // setSellPrice((parseInt(_sellPrice) / 1e18).toFixed(2))
    // setBuyPrice((parseInt(_buyPrice) / 1e18).toFixed(2))

    // setBusdBalance((parseInt(_balance) / 1e18).toFixed(2))
    // setRMSTBalance((parseInt(_ramaBalance) / 1e18).toFixed(2))

    // console.log("_balance", _balance, _ramaBalance)
  }


  return (
    <div>
      <Header />
    
      <div className="bg-purple-400 shadow-lg rounded-xl mx-auto  lg:w-1/4 md:w-2/3 sm:w-screen  ">
        <div className="wiggle  mx-auto  p-4 shadow z-10 bg-purple-100 mt-20 rounded-xl transform   lg:translate-x-6 translate-y-6 lg:p-15  ">
          <div className="w-auto bg-purple-200 p-2 rounded-xl mb-10 p-4 flex ">
            <div class="flex-grow">
              <div
                className=" font-semibold text-left"
                style={{ color: "#2A2337" }}
              >
                You Will Pay
              </div>
              <input
                type="number"
                value={busdAmount}
                onChange={(e) => {
                  calculateBUSDToRAMAAmount(e.target.value);
                  // e.preventdefault()
                }}
                placeholder="0"
                className="bg-purple-200  rounded-lg focus:outline-none w-max text-xl font-semibold"
              />
              <div></div>
            </div>

            <div class="flex-none  font-semibold text-left">
              {busdBalance ? <div>{busdBalance}</div> : null}
              <div className="flex">
                <BUSDLogo height="20" width="20" />
                <div> BUSD</div>
              </div>
            </div>
          </div>

          <div className="w-auto bg-purple-200 p-2 rounded-xl mb-10 p-4 flex ">
            <div class="flex-grow">
              <div
                className=" font-semibold text-left"
                style={{ color: "#2A2337" }}
              >
                You Will Get
              </div>
              <input
                type="number"
                onChange={(e) => {
                  calculateRAMAToBUSDAmount(e.target.value);
                  // e.preventdefault()
                }}
                value={rmsAmount}
                placeholder="0"
                className="bg-purple-200  rounded-lg focus:outline-none w-max text-xl font-semibold"
              />
              <div></div>
            </div>

            <div class="flex-none   font-semibold text-left">
              {rmstBalance ? <div>{rmstBalance}</div> : null}

              <div className="flex">
                <img
                  src="../logo.png"
                  height="20"
                  width="20"
                  style={{ marginRight: 2 }}
                />
                <div> RAMA</div>
              </div>
            </div>
          </div>

          <div className="text-center w-auto p-2 bg-purple-700 rounded-xl ">
            {renderButton()}
          </div>

          <div className="flex mt-10 font-bold	">
            <div className="bold"> Price: </div>

            <img
              src="../logo.png"
              height="20"
              width="20"
              style={{ marginRight: 2 }}
            />
            <div> RAMA  ${buyPrice}</div>


          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ICO;
