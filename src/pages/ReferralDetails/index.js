import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "use-wallet";

import config, { HALF_YEAR_APY, ANNUAL_APY } from "../../config";
import { Table } from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import web3 from "web3";
import { load } from "js-yaml";
function ReferralDetails(props) {
  const wallet = useWallet();
  const [refData, setRefData] = useState([]);

  useEffect(() => {
    if (wallet.account && props.contracts && props.contracts.tokenContract) {
      setInterval(() => {
        loadBalance(wallet.account, props.contracts.tokenContract);
      }, 5000);
    }

    console.log("props.contract.tokenContract", props.contracts);
  }, [wallet.account, props.contracts]);

  useEffect(() => {
    if (wallet.account && props.contracts && props.contracts.mlmContract) {
      setInterval(() => {
        loadMLMData(wallet.account, props.contracts.mlmContract);
      }, 3000);
    }
  }, [wallet.account, props.contracts]);

  const loadBalance = async (account, contract) => {
    // console.log("loadBalance", account, contract);

    let tokenBalance = await contract.methods.balanceOf(account).call();

    // setAccountBalance((tokenBalance / 1e18).toFixed(2));
  };

  const getBalance = () => {
    if (wallet.balance != -1) {
      return (wallet.balance / 1e18).toFixed(4);
    } else {
      return "-";
    }
  };


  const getShortLink = (walletAddr) => {
    

    let link = walletAddr.substring(0, 4) + "..." + walletAddr.slice(-4);
    return link;
  };


  const loadMLMData = async (account, contract) => {
    contract
      .getPastEvents(
        "SetReferral",
        {
          // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
          fromBlock: 0,
          toBlock: "latest",
        },
        function (error, events) {
          let refEvent = [];
          console.log("pointtttttttt",events)

          for (let event of events) {
            let data = {
              account: event.returnValues["0"],
              referral: event.returnValues["1"],
              amount: event.returnValues["2"] / 1e18,
            };

            // if (data.referral === account) {
            //   refEvent.push(data);
            // }


            if (data.account === account) {
              refEvent.push(data);
            }

            

            console.log("dataeventtt", data);
          }

          setRefData(refEvent);

          console.log("pointeve", events);
        }
      )
      .then(function (events) {
        console.log(events); // same results as the optional callback above
      });
  };

  const renderRefTable = () => {
    let rows = [];

    let i = 1;
    for (let data of refData) {
      rows.push(
        <tr>
          <th scope="row">i</th>
          <td><a href={"https://bscscan.com/address/"+data.account}>{getShortLink(data.account)}</a></td>
          <td>{data.amount}</td>
          <td>@fat</td>
        </tr>
      );

      i = i + 1;
    }

    return rows;
  };

  return (
    <div className="dashboard-container">
      <div className="navbar-toggle">
        <i className="fas fa-bars" />
      </div>

      <div className="sidebar">
        <div className="logo">
          <a href="../index.html">
            <img src="./assets/images/ami logo.png" alt="" />
          </a>
        </div>
        <nav>
          <ul>
            <li className="active">
              <a href="index.html">
                <i className="fas fa-columns" />
              </a>
            </li>
            <li>
              <a href="leader.html">
                <i className="fas fa-chart-line" />
              </a>
            </li>
            <li>
              <a href="user.html">
                <i className="fas fa-user" />
              </a>
            </li>
            <li className="rotate">
              <a href="settings.html">
                <i className="fas fa-cog" />
              </a>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <li>
            <i className="fas fa-sign-out-alt" />
          </li>
        </div>
      </div>

      <main>
        <div className="main-content">
          <div className="dash-header">
            <div style={{ maxWidth: "450px", width: "100%" }}>
              <div className="dashboard-heading flex">
                <p style={{ margin: 0, padding: 0 }}>
                  <i className="fas fa-columns" />
                </p>
                <div className="name flex">
                  <div className="letters letters-0 ×">D</div>
                  <div className="letters letters-1 A">A</div>
                  <div className="letters letters-2 L">S</div>
                  <div className="letters letters-3 E">H</div>
                  <div className="letters letters-4 X">B</div>
                  <div className="letters letters-5 ×">O</div>
                  <div className="letters letters-6 B">A</div>
                  <div className="letters letters-7 R">R</div>
                  <div className="letters letters-8 O">D</div>
                </div>
                <p />
              </div>
              <div className="dashboard-small-heading flex">
                <p>
                  <i
                    className="fas fa-wallet"
                    style={{ color: "rgb(255,195,115)" }}
                  />
                  BNB :{" "}
                  <span id="myBal">
                    {getBalance()}
                    <span></span>
                  </span>
                </p>
                <p onclick="openContract()" style={{ cursor: "pointer" }}>
                  <span id="cAddress">{wallet.account}</span>
                </p>
              </div>
            </div>
            <div className="flexcolumn">
              <div className="header-button flex">
                {/* <div className="primary-btn"><span id="address">
                  Your Wallet Address</span>
              </div> */}
                <div
                  className="secondary-btn"
                  onClick={() => {
                    wallet.connect();
                  }}
                >
                  {wallet.account ? "Connected" : "Connect"}
                </div>
              </div>
            </div>
          </div>
          <div className="dash-content mh-450">
            <div className="row mh-450">
              <div className="col-md-6">
                <div
                  className="dash-wallet"
                  style={{ minHeight: "570px !important" }}
                >
                  <h3>Referral Details</h3>

                  <Table color={"white"} striped>
                    <thead color={"white"}>
                      <tr>
                        <th>#</th>
                        <th color={"white"}>Wallet Address</th>
                        <th>Date </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>

                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>

                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>

                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="dash-wallet"
                  style={{ minHeight: "570px !important" }}
                >
                  <h3>Your Actions</h3>

                  <Table color={"white"} striped>
                    <thead color={"white"}>
                      <tr>
                        <th>#</th>
                        <th color={"white"}>Wallet Address</th>
                        <th>Date </th>
                      </tr>
                    </thead>
                    <tbody>{renderRefTable()}</tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default ReferralDetails;
