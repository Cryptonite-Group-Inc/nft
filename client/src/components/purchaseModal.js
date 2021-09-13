import React, {useState, useContext, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {AppContext, connectWallet} from '../context/app'
import {
  Link
} from "react-router-dom";

import { useAlert } from "react-alert";

const PurchaseModal = (props) => {
  const alert = useAlert();
  const {state, dispatch} = useContext(AppContext)
  const [price, setPrice] = useState(null)
  const [stock, setStock] = useState(null)
  const [count, setCount] = useState(0)
  const [agreed, setAgreed] =  useState(false)

  const onCountChange = (e) => {
    setCount(parseInt(e.target.value))
  }

  const onCheck = (e) => {
    setAgreed(e.target.checked)
  }

  const increase = () => {
    if (count >= 20) return;
    setCount(count + 1);
  }

  const decrease = () => {
    if (count <= 0) return;
    setCount(count - 1);
  }

  const onPurchaseClick = () => {
    if (!agreed) {
      alert.error('Did you read, agree and comply with Terms & Conditions and Disclaimer?')
      return;
    }
    try {
      state.contract.methods.mint(state.accounts[0], count).send({
        from : state.accounts[0],
        value: price * count
      })
      .on('transactionHash', function(transactionHash){ 
        alert.show(`Transaction ${transactionHash} waiting to be minted.`);
       })
      .on('receipt', function(receipt){
        console.log('done: ', receipt)
        props.onSuccess()
      })
      .on('error', (error, receipt) => {
        console.log(error)
        alert.error('Your purchase failed!')
      })
    } catch (error) {
      console.log(error)
    }
    props.onHide()
  }

  useEffect(async () => {
    // Connect chain and get price, stock value
    if (state.contract != null && props.show) {
      let currentPrice = await state.contract.methods.PRICE().call();
      let totalSupply = await state.contract.methods.totalSupply().call();
      setPrice(currentPrice)
      setStock(totalSupply)
    }
  }, [props]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thanks for your interest in Uglys!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal__content modal__content__buy" id="modal__buy-content">
          <p>
            Hooray! You are one step away from adding Uglys to your personal collection.
            The current price for <strong>1 Uglya is {price? `${state.web3.utils.fromWei(price.toString())} ETH`: ``}</strong>. 
            The price will change based on our pricing tier. There are currently only <strong>{stock? 10000 - stock: ``}</strong> Uglys available. 
            You may purchase up to 20 Uglys per transaction.
          </p>
          <p className="modal-bold-text">How many Uglys would you like to buy?</p>
          <div className="modal__buy__form">
              <div className="modal__buy__form__quantity">
                  <span className="input-number-decrement" onClick={decrease}>–</span>
                  <input className="input-number" type="number" value={count} onChange={onCountChange} min="0" max="20"/>
                  <span className="input-number-increment" onClick={increase}>+</span>
              </div>
          </div>
          <div className="modal__buy__check" id="agreedToTermsContainer">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" checked={agreed} onChange={onCheck} id="agreedToTerms" />
                  <label className="form-check-label" for="agreedToTerms">
                      You agree that <b>you have read and comply</b> with the <Link to='/terms' className="color-mint">Terms &amp; Conditions</Link> and <Link to='/disclaimer' className="color-mint">Disclaimer</Link>
                  </label>
              </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn-purchase w-100" onClick={onPurchaseClick}>Buy Uglys</button>
      </Modal.Footer>
    </Modal>
  )
  
}

export default PurchaseModal