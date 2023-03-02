import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "use-wallet";

import config from "../../config";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import web3 from "web3";
import Header from "../../components/Header"
import { Table } from 'reactstrap';
import rawCurrencies from "../../config/currencies";
import axios from "axios";
import Web3 from "web3";
import Coinpayments from 'coinpayments';
import StakingABI from "../../config/ABI/StakingABI.json"
import { Text, Heading, Flex, Grid, Flex1 } from "./style/Style";


const OneCurrencyButton = ({ currency, isSelected, onSelect }) => {


  return <div
    onClick={() => {
      if (onSelect) {
        onSelect(currency)

      }
    }}
    style={{
      width: "100% !important",
      background: isSelected ? "#2a223761" : "white",

    }} className={`  hoverable text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full  text-gray-700 border w-full w-10`}
  >
    <img src={`/coins/${currency.id}.png`}
      className=" mr-2"

      height={30} width={30} />


    <p className={isSelected ? "text-white" : "text-gray-700 "}>
      {currency.symbol}
    </p>


  </div>

}

const StakePopUp = (props) => {

  const [currencies, setCurrencies] = useState([])
  const [mode, setMode] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState()
  const [ramaAmount, setRamaAmount] = useState(0)
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState(0)
  const [walletAddress, setWalletAddress] = useState("")
  const ramaCoin = {
    id: "rama",
    name: "Ramessta",
    symbol: "RAMA",
    price: config.PRICE
  }


  useEffect(() => {
    if (selectedCurrency) {
      const currencyAmountInUSD = selectedCurrency.price * inputCurrencyAmount;
      const usdtToRama = currencyAmountInUSD / config.PRICE
      setRamaAmount(usdtToRama)
    }
  }, [selectedCurrency, inputCurrencyAmount])
  const loadCurrencyData = async () => {
    let prices = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctron%2Cbinancecoin%2Clitecoin&vs_currencies=usd")
    prices = prices.data;

    const _currencies = [];

    for (let rawCurrency of rawCurrencies) {
      let price = rawCurrency.price;
      if (rawCurrency.id === "eth") {
        price = prices.ethereum.usd
      } else if (rawCurrency.id === "trx") {
        price = prices.tron.usd
      } else if (rawCurrency.id === "btc") {
        price = prices.bitcoin.usd
      } else if (rawCurrency.id === "bnb") {
        price = prices.binancecoin.usd
      } else if (rawCurrency.id === "ltc") {
        price = prices.litecoin.usd
      }


      _currencies.push({ ...rawCurrency, price })

    }

    console.log({ _currencies })
    setCurrencies(_currencies)
    setSelectedCurrency(_currencies[0])

  }
  useEffect(() => {
    loadCurrencyData()
  }, [])


  const handleStakeNow = async () => {
    setLoading(true)


    try {

      const payload = {
        "toCurrency": selectedCurrency.coinpaymentId,
        "walletAddress": walletAddress,
        "usdAmount": ramaAmount * config.PRICE
      }

      const resp = await axios.post(`${config.COINPAYMENT_SERVER}/createTxn`, payload)
      console.log({ resp })
      window.location.href = resp.data.data.checkout_url
    } catch (err) {
      console.error("handleStakeNow", err)
    }
    setLoading(false)
  }
  const validate = (mode) => {
    if (!inputCurrencyAmount) {
      alert("Please Enter Amount")
      return
    }

    if (!Web3.utils.isAddress(walletAddress)) {
      alert("Please Enter Valid Wallet Address")
      return
    }

    return true
  }


  return (
    <div>
      {props.show ? <><div
        className="justify-center dark items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl  ">

          <div className="border-0 rounded-lg shadow-lg   bg-red relative flex flex-col w-full  outline-none focus:outline-none" style={{ background: "#2a2337" }}>
            <div className="relative p-6 flex-auto">
              <div >
                <div className="" style={{ color: "#fff" }}>
                  <div className="grid grid-cols-2" >
                    <div>
                      <button
                        className="text-white bg-red font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        style={{
                          background: "red"
                        }}
                        type="button"
                        onClick={() => props.onPopupClose(false)}
                      >
                        Close
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl	 font-bold">Stake</h3>

                    </div>

                  </div>
                  <hr className="mt-2" />



                </div>
                <div className="">
                  {mode == 0 ? (
                    <div id="formSubmit">
                      <div>
                        <span className="text-lg text-white	">Select Currency  </span>

                        {selectedCurrency ? <div class="grid grid-cols-6 gap-3 ">

                          {currencies.map((item) => {
                            return <OneCurrencyButton currency={item}
                              isSelected={item.id === selectedCurrency.id}
                              onSelect={(c) => {
                                setSelectedCurrency(c)
                              }} />

                          })}
                        </div> : null}


                      </div>


                      <div>

                        <div className="flex  mt-4 align-middle border border-sky-500 p-2 border-r-2">
                          <div className="">
                            <OneCurrencyButton currency={selectedCurrency} />

                          </div>
                          <input

                            style={{
                              width: "100% !important"
                            }}
                            type="number"
                            min={0}
                            value={inputCurrencyAmount}
                            // ref={inputRef}
                            onChange={(n) => {
                              console.log("cdcxcxcxcx", n.target.value);
                              setInputCurrencyAmount(n.target.value);
                            }}
                            placeholder={`Enter ${selectedCurrency.symbol} Amount`}
                            className="primary-input w-full"
                            required
                          />
                        </div>



                        {/* <div
                          onClick={() => {
                            // onSelect(currency)
                          }}
                          style={{

                            // width: "100% !important",
                            background: "white",

                          }} className={`  hoverable text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full  text-gray-700 border mt-3`}
                        >
                          <img src={`/coins/RAMA.png`}
                            className=" mr-2"

                            height={30} width={30} />


                          <p className={"text-gray-700 "}>
                         1000  RAMA
                          </p>


                        </div> */}

                      </div>

                      {ramaAmount ? <div className="flex  mt-4 align-middle border border-sky-500 p-2 border-r-2">
                        <div className="">
                          <OneCurrencyButton currency={ramaCoin} />

                        </div>
                        <input

                          disabled
                          style={{
                            width: "100% !important"
                          }}
                          // type="number"
                          min={0}
                          // value={stakingInput}
                          // ref={inputRef}
                          onChange={(n) => {
                            console.log("cdcxcxcxcx", n.target.value);
                            // setStakingInput(n.target.value);
                          }}
                          value={ramaAmount}
                          className="primary-input w-full"
                          required
                        />
                      </div> : null}


                      <div>

                        <div className="flex  mt-4 align-middle border border-sky-500 p-2 border-r-2">

                          <input

                            style={{
                              width: "100% !important"
                            }}
                            type="text"
                            min={0}
                            value={walletAddress}
                            // ref={inputRef}
                            onChange={(n) => {
                              console.log("cdcxcxcxcx", n.target.value);
                              setWalletAddress(n.target.value);
                            }}
                            placeholder={`Enter RAMA Wallet Address`}
                            className="primary-input w-full"
                            required
                          />
                        </div>




                      </div>


                      <button
                        onClick={() => {
                          // setStakingAmount(inputRef.current.value);
                          const isValid = validate(0);
                          if (isValid) {
                            setMode(1);

                          }
                        }}
                        className="secondary-btn next-btn"
                      >

                        Next

                      </button>
                    </div>
                  ) : (
                    <div>
                      <Table responsive>
                        <thead >

                        </thead>
                        <tbody>


                          <tr>
                            <td>Buy Currency</td>
                            <td className="tokenAmount" id="stakeAmount">
                              <OneCurrencyButton currency={selectedCurrency} />
                            </td>
                          </tr>


                          <tr>
                            <td>Buy Currency Amount</td>
                            <td className="tokenAmount" id="stakeAmount">
                              {inputCurrencyAmount} {selectedCurrency.symbol}
                            </td>
                          </tr>
                          <tr>
                            <td>Stake Amount</td>
                            <td className="tokenAmount" id="stakeAmount">
                              {ramaAmount.toFixed(2)} RAMA
                            </td>
                          </tr>


                          <tr>
                            <td>Stake Amount (in $)</td>
                            <td className="tokenAmount" id="stakeAmount">
                              ${(ramaAmount * config.PRICE).toFixed(2)}
                            </td>
                          </tr>

                          <tr>
                            <td>Unlock Date</td>
                            <td id="endDate">
                              {moment()
                                .add(24, "months")
                                .format("DD MMM YYYY")}
                            </td>
                          </tr>
                          <tr>
                            <td>Total Reward</td>
                            <td className="totalPrice">
                              {(ramaAmount * config.TOTAL_ROI / 100).toFixed(2)} RAMA

                            </td>
                          </tr>


                          <tr>
                            <td>Receiver Wallet Address</td>
                            <td className="totalPrice">
                              <a href={`https://www.ramascan.com/address/${walletAddress}`}
                                style={{ color: "yellow", textDecoration: "underline" }}
                                target="_blank">
                                {walletAddress}
                              </a>

                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <div className="row">
                        <button
                          style={{ color: "#fff !important" }}
                          onClick={() => {
                            handleStakeNow();
                          }}
                          className="secondary-btn next-btn"
                        >
                          {isLoading ? (
                            <div class="spinner-border" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Stake Now"
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setMode(0)
                          }}
                          className="primary-btn next-btn" style={{ color: "#fff" }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      </>

        : null}
    </div>
  );
};





function Home(props) {
  const wallet = useWallet();
  const [showPopUp, setShowPopUp] = useState(false);


  const [depositData, setDepositData] = useState([]);

  const [totalStakedAmount, setTotalStakedAmount] = useState("0");
  const [pendingReward, setPendingReward] = useState("0")

  const [stakingContract, setStakingContract] = useState()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (stakingContract && wallet.account) {
      loadData()

      setInterval(async () => {
        await loadData()
      }, 5000)
    }

  }, [stakingContract, wallet.account])

  useEffect(() => {
    if (wallet.account) {
      const _web3 = new Web3(window.ethereum?window.ethereum:config.RPC)
      const contract = new _web3.eth.Contract(StakingABI, config.STAKING_ADDRESS);
      setStakingContract(contract)
    }

  }, [wallet.account,window.ethereum])



  const loadData = async () => {
    const walletAddress = wallet.account
    const totalDepositLength = await stakingContract.methods.getDepositLength(walletAddress).call();
    
    const maxLockTime = await stakingContract.methods.MAX_LOCK_TIME().call()
    const deposits = [];

    let totalDeposit = 0;
    let totalReward = 0;

    for (let i = 0; i < totalDepositLength; i++) {
      const deposit = await stakingContract.methods.stakingInfo(walletAddress, i).call()

      const _pendingReward = await stakingContract.methods.getPendingReward(walletAddress, i).call();
      const amount = Web3.utils.fromWei(deposit.amount);
      const pendingReward = Web3.utils.fromWei(_pendingReward);
      totalDeposit += Number(amount)
      totalReward += Number(pendingReward)

      deposits.push({
        id: i,
        timestamp: deposit.timestamp,
        expireTimestamp: Number(deposit.timestamp) + Number(maxLockTime),
        readableTime: moment(deposit.timestamp).format("DD MMM YYYY hh:mm a"),
        amount,
        isWithdrawn: deposit.isWithdrawn,
        pendingReward,

      })
    }

    setDepositData(deposits)
    setPendingReward(totalReward);
    setTotalStakedAmount(totalDeposit)
  }





  useEffect(() => {
    wallet.connect();
    // loadTokenPrice()
  }, []);









  const handleWithdraw = async (id) => {
    if (!wallet.account) {
      toast.error("Please connect your wallet");
      return;
    }
    setLoading(true)

    try {
      await stakingContract.methods
      .withdraw(id)
      .send({ from: wallet.account });
    } catch (err) {
      console.log(err)
    }
    setLoading(false)

  };
  return (
    <div className="dashboard-container" style={{ background: "#2a2337", }}>

      <StakePopUp
        show={showPopUp}
        onPopupClose={() => {
          setShowPopUp(false);
        }}
      />

      <Header />

      <main>
        <div className="main-content" style={{display:"flex",alignItems:'center',justifyContent:'center'}}>

          <div className="dash-content" style={{}}>
            <div className="col-md-12 dash-wallet" style={{maxWidth:""}} >
              <Flex
              
              >
                {/* <div className="wallet-value circle">
                    <p>Total Balance</p>
                    <h2 style={{ color: "#8248e5", fontWeight: "bold", fontSize: "33px" }} id="totalBalance">{accountBalance}</h2>
                    <p>RAMA</p>
                  </div> */}
                <Grid>
                 
                    <div>
                      <Text>Annual APR</Text>
                      <Heading>18%</Heading>
                    </div>
               

                  <div>
                    <Text>Rama Price </Text>
                    <Heading>$0.12</Heading>
                  </div>



                  <div>
                    <Text>Total Staked</Text>
                    <Heading id="ystaked">{Number(totalStakedAmount).toFixed(2)} RAMA</Heading>
                  </div>




                  <div >
                    <Text>Pending Reward </Text>
                    <Heading id="hreward">{Number(pendingReward).toFixed(2)} RAMA</Heading>  
                  </div>

                </Grid>
                <Flex1>

                  <div className="col-md-6 col-6">
                    <div
                      className="secondary-btn text-light font-bold"
                      onClick={() => {
                        setShowPopUp(true);
                      }}
                    >
                      Stake
                    </div>
                  </div>
                  <div
                    disabled
                    className="col-md-6 col-6"
                    onClick={() => {
                      handleWithdraw();
                    }}
                  >
                    <div className="disabled-btn  font-bold disabled ">Unstake</div>
                  </div>
                  </Flex1>
                  <div 
                  style={{width:"100%",height:"2px", background:"#8248e5",margin:'2rem 0 0 0'}}
                />


<div>
    <Table responsive  style={{ color: "#000" }}>
      <thead>
        <tr>
          <td colSpan={2}>ID</td>

          <td colSpan={2}>Stake Date</td>
          <td colSpan={2}>Staked Amount</td>
          <td colSpan={2}>Pending Reward</td>
          <td colSpan={2}>Unlock Time </td>
          <td colSpan={2}>Action </td>

        </tr>
      </thead>
      <tbody>



        {depositData.map((e) => {
          return <tr>
            <td colSpan={2}>{e.id + 1}</td>

            <td colSpan={2}>  {moment.unix(e.timestamp)
              .format("DD MMM YYYY hh:mm a")}</td>
            <td colSpan={2}>{Number(e.amount).toFixed(2)} RAMA</td>

            <td colSpan={2}>{Number(e.pendingReward).toFixed(2)} RAMA</td>

            <td colSpan={2}>

              {moment.unix(e.expireTimestamp)
                .format("DD MMM YYYY hh:mm a")}
            </td>

            <td colSpan={2}>

              <button
                disabled={(Date.now()/1000)< e.expireTimestamp || e.isWithdrawn}
                style={{ color: "#fff !important" }}
                onClick={() => {
                  handleWithdraw(e.id);
                }}
                className={`secondary-btn ${(Date.now()/1000)< e.expireTimestamp || e.isWithdrawn?"disabled-btn":""} `}
              >
                {isLoading ? (
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                 e.isWithdrawn?"Claimed": "Withdraw"
                )}
              </button>
            </td>
          </tr>

        })}




      </tbody>
    </Table>
  </div>

              </Flex>

             
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default Home;
