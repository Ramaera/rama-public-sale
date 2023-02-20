
import { useState } from "react";
import { useWallet } from "use-wallet";


const Header = ()=>{

    const wallet = useWallet();

    useState(()=>{
      wallet.connect()
    },[])
    const getAddress = (wallet)=>{
      return `${wallet.substring(0, 4)}....${wallet.substring(wallet.length - 4)}`

    }

    return     <div
    style={{
      position: "relative",
      width: "100%",
      top: 0,
      height: "80px",
      zIndex: 9999,
      background: "black",
    }}
  >
    <div
      className="main-content"
      style={{ display: "flex", flexFlow: "row no-wrap", width: "100%" }}
    >
      <div
        className=" logo"
        style={{ width: "33%", margin: "auto", display: "block" }}
      >
        <a href="#">
          <img
            src="../logo.png"
            alt=""
            style={{ width: "50px", margin: "auto", display: "block" }}
          />
        </a>
      </div>
      {window.screen.width > 900 && (
        <div style={{ width: "33%", margin: "auto", display: "block" }}>
          <ul style={{ listStyle: "none", textAlign: "center" }}>
            <li
              style={{
                color: "#fff",
                display: "inline-block",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <a href="http://ramestta.com/" className="text-white cursor-pointer">
                Home
              </a>
            </li>
            <li
              style={{
                color: "#fff",
                display: "inline-block",
                padding: "20px",
              }}
            >
              <a href="/" className="text-white cursor-pointer">Staking</a>
            </li>
            {/* <li
              style={{
                color: "#fff",
                display: "inline-block",
                padding: "20px",
              }}
            >
              <a href="https://exchange.ramestta.com" className="text-white cursor-pointer">
                Buy RAMA
              </a>
            </li> */}
          </ul>
        </div>
      )}

      <div
        className=""
        style={{
          float: "right",
          width: "33%",
          margin: "auto",
          display: "block",
        }}
      >
        <div className="header-button flex" style={{ padding: "12px" }}>
          {/* <div className="primary-btn"><span id="address">
            Your Wallet Address</span>
          </div> */}
          <div
            className="secondary-btn"
            onClick={() => {
              wallet.connect();
            }}
          >
            {wallet.account ? getAddress(wallet.account) : "Connect"}
          </div>
       
       
 
      
      
        </div>


        
      </div>
    </div>
  </div>
}


export default Header