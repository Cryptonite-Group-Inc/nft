import React, {useState, useContext, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'
import SaleProgress from '../components/saleProgress'
import {AppContext, updateAccounts} from '../context/app'
import getWeb3 from '../utils/getWeb3'
import PurchaseModal from '../components/purchaseModal'
import CongratulationModal from '../components/congrateModal'
import WalletItem from '../components/walletItem'
import { useAlert } from "react-alert";
import {
  Link
} from "react-router-dom";
const Wallet =  () => {
  const alert = useAlert();
  const {state, dispatch} = useContext(AppContext)
  const [balance, setBalance] = useState(0)
  const [modalShow, setModalShow] = React.useState(false);
  const [congShow, setCongShow] = React.useState(false);

  const onPurchaseClick = async () => {
    await state.web3.currentProvider.enable();
    if (state.accounts.length == 0) {
      const accounts = await state.web3.eth.getAccounts();
      dispatch(updateAccounts(accounts))
    }
    setModalShow(true);
  }

  useEffect(async () => {
    // Connect chain and get price, stock value
    if (state.contract != null && state.accounts.length > 0) {
      let currentBalance = await state.contract.methods.balanceOf(state.accounts[0]).call();
      setBalance(parseInt(currentBalance))
    }
  }, []);

  useEffect(async () => {
    // Connect chain and get price, stock value
    if (state.contract != null && state.accounts.length > 0) {
      let currentBalance = await state.contract.methods.balanceOf(state.accounts[0]).call();
      setBalance(parseInt(currentBalance))
    }
  }, [state.accounts]);

  return (
    <>
      <Header/>
      <main>
          <div className="wallet">
              <div className="container">
                  <div className="row text-center">
                      <div className="col-lg-12">
                          <h2>Your Wallet</h2>
                          <span className="hash" id="wallet_address">{state.accounts && state.accounts.length > 0 ? state.accounts[0] : `Loading wallet address...`}</span>
                          <div className="wallet-btn">
                              <button type="button" className="btn btn-warning btn-min-w" data-toggle="modal" data-target="#buyModalCenter" onClick={onPurchaseClick}>
                                  Buy Uglys
                              </button>
                          </div>
                          <p className="wallet-reminder">
                              <strong>Reminder:</strong> During the initial public sale period (or until sold out) your Uglys
                              have not yet been assigned an identity.
                          </p>
                      </div>
                  </div>
                  <div className="row text-center">
                      <div className="col-lg-12">
                          <h3 className="subheader__title" id="your_pixls">Your Uglys (<span id="your-pets" className="color-mint"> {balance} </span>)</h3>
                          <div id="pixls_container" className="wallet__gallery">
                              <p className="wallet-text">
                                  {balance? `Still under construction, but you can view your Uglys on Opensea here`:`Oh no! Looks like you don't own any Uglys yet. Buy one for your personal collection!`}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {balance > 0 && (
            <div className="gallery">
              <div className="container">
                <div className="row">
                  {Array.from(Array(balance).keys()).map(idx => 
                    <div className="col-md-6 col-lg-3 mb-4" key={idx}>
                      <WalletItem address={state.accounts[0]} idx={idx}/>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
      </main>
      <div className="about-page">
        <Footer/>
      </div>
      <PurchaseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSuccess = {() => setCongShow(true)}
      />
      <CongratulationModal
        show={congShow}
        onHide={() => setCongShow(false)}
        onBuyMore= {() => setModalShow(true)}
      />
    </>
  )
}

export default Wallet