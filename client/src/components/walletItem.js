import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios';
import {AppContext, updateAccounts} from '../context/app'
import GalleryItem from './galleryItem'


const WalletItem = ({address, idx}) => {
  const {state, dispatch} = useContext(AppContext)
  const [tokenId, setTokenID] = useState(null)

  useEffect(async() => {
    if (state.contract != null) {
      let token_id = await state.contract.methods.tokenOfOwnerByIndex(address, idx).call()
      setTokenID(token_id)
    }
  }, [])

  return tokenId === null? null : <GalleryItem tokenId={tokenId}/>
}

export default WalletItem