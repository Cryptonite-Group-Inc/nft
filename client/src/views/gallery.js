import React, {useState, useContext, useEffect} from 'react'
import Header from '../components/Header'
import Footer from '../components/footer'
import SaleProgress from '../components/saleProgress'
import {AppContext, connectWallet} from '../context/app'
import getWeb3 from '../utils/getWeb3'
import card_1 from '../assets/img/1.png'
import card_2 from '../assets/img/2.png'
import card_3 from '../assets/img/3.png'
import card_4 from '../assets/img/4.png'
import card_5 from '../assets/img/5.png'
import card_6 from '../assets/img/6.png'
import card_7 from '../assets/img/7.png'
import card_8 from '../assets/img/8.png'
import GalleryItem from '../components/galleryItem'

const Gallary =  () => {
  const {state, dispatch} = useContext(AppContext)
  const [supply, setSupply] = useState(0)

  useEffect(async () => {
    if (state.contract != null) {
      let t = await state.contract.methods.totalSupply().call();
      setSupply(parseInt(t));
    }
  })

  return (
    <div className="about-page">
      <Header/>
      <main className="flex-fill">
          <div className="gallery">
              <div className="container">
                  <h1>Coming soon...</h1>
                  <h1>Our gallery won't be revealed until after the public sale has ended, but until then, here's a sneak peek!</h1>
                  {supply === 0? (
                    <h1>There is not minted Ugly yet! Please be the first one!</h1>
                  ) : 
                  <div className="row">
                      {Array.from(Array(supply).keys()).map(idx => 
                        <div className="col-md-6 col-lg-3 mb-4" key={idx}>
                          <GalleryItem tokenId={idx}/>
                        </div>
                      )}
                  </div> 
                  }
              </div>
          </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Gallary