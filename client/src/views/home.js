import React, {useState, useContext} from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'
import SaleProgress from '../components/saleProgress'
import PurchaseModal from '../components/purchaseModal'
import CongratulationModal from '../components/congrateModal'
import {AppContext, connectWallet, updateAccounts} from '../context/app'

import getWeb3 from '../utils/getWeb3'


import { useAlert } from "react-alert";

const Home =  () => {
  const alert = useAlert();
  const {state, dispatch} = useContext(AppContext)
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

  return (
    <div className="about-page">
      <Header home={true}/>
      <SaleProgress clickHandler={onPurchaseClick}/>
      <Footer/>
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
    </div>
  )
}

export default Home