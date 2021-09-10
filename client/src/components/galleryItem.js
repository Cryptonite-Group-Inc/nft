import React, {useState, useContext, useEffect} from 'react'
import {AppContext, updateAccounts} from '../context/app'
import axios from 'axios';

const GalleryItem = ({tokenId}) => {
  const {state, dispatch} = useContext(AppContext)
  const [meta, setMeta] = useState(null)

  useEffect(async() => {
    if (state.contract != null) {
      let token_uri = await state.contract.methods.tokenURI(tokenId).call();
      axios.get(token_uri)
      .then(res => {
        const metaData = res.data;
        setMeta(metaData)
      })
    }
  }, [])

  return (
    <div className="box-gallery">
      <div className="gallery-item position-relative">
        {meta && <img src={meta.image} alt="Whatnots"/>}
      </div>
    </div>
  )
}

export default GalleryItem