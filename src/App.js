import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import ReferralDetails from "./pages/ReferralDetails";

import BlockchainProvider from "./BlockchainProvider";
import ICO from "./pages/ICO";
function App() {
  const [contracts, setContracts] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refLink = urlParams.get("masternode");

    if (refLink) {
      localStorage.setItem("masternode", refLink);
    }
  }, []);

  return (
    <>
      <BlockchainProvider
        onContractsLoaded={(contracts) => {
          setContracts(contracts);
        }}
      />

      <BrowserRouter>
        <Switch>
          {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
          <Route path="/">
            {/* <Home contracts={contracts} /> */}

            <Home contracts={contracts} />
          </Route>
          {/* <Route path="/">

            <ICO contracts={contracts}  onlyBuy/>
          </Route> */}
          <Route path="/stats">
            <Events contracts={contracts} />
          </Route>

          <Route path="/referral">
            <ReferralDetails contracts={contracts} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
