import React, {useReducer, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import {AppContext, initialState, reducer, initWallet} from './context/app'
import Home from './views/home'
import Wallet from './views/wallet'
import Gallary from './views/gallery'
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import getWeb3 from './utils/getWeb3'
import MishkaContract from './abis/MishkaDinos.json';

const options = {
  timeout: 5000,
  position: positions.CENTER
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(async () => {
    // Connect chain and get price, stock value
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = 97;
    
    const deployedNetwork = MishkaContract.networks[networkId]
    if (deployedNetwork == undefined) {
      alert('please connect right network')
    } else {
      const instance = new web3.eth.Contract(
        MishkaContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      dispatch(initWallet(web3, instance, accounts))
    }
  }, []);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="App">
          <HashRouter>
            <Switch>
              <Route
                exact
                path={`/`}
                component={Home}
              />
              <Route
                path={`/wallet`}
                component={Wallet}
              />
              <Route
                path={`/gallery`}
                component={Gallary}
              />
              <Redirect to="/"/>
            </Switch>
          </HashRouter>
        </div>
      </AlertProvider>
    </AppContext.Provider>
  );
}

export default App;
