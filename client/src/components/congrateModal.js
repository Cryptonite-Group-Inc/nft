import React, {useState, useContext, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {AppContext, connectWallet} from '../context/app'
import {
  Link
} from "react-router-dom";

const CongratulationModal = (props) => {
  const onMore = () => {
    props.onHide()
    props.onBuyMore()
  }

  const openDiscord = () => {
    window.location.href = ''; 
  }

  const openTwitter = () => {
    window.location.href = ''; 
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Hooray! You bought some Mishkas!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal__content modal__content__buy" id="modal__buy-content">
          <p>
            Congratulations! You are now the proud owner of some
            Mishka! 
          </p>
          <p>
            <strong>Reminder:</strong> <strong>Stay tuned!</strong>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-primary" onClick={openTwitter}>Tweet about us</button>
        <button type="submit" className="btn btn-warning" onClick={onMore}>Want More Mishkas?</button>
        <button type="submit" className="btn btn-secondary" onClick={openDiscord}>Join Discord</button>
      </Modal.Footer>
    </Modal>
  )
}

export default CongratulationModal