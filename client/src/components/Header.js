import React, {useState, useContext} from 'react'
// import image_top from '../assets/img/web-image-top.png'
import web_image1 from '../assets/img/web_image1.png'
import web_image2 from '../assets/img/web_image2.png'
import web_image3 from '../assets/img/web_image3.png'
import web_image4 from '../assets/img/web_image4.png'
import web_image5 from '../assets/img/web_image5.png'
import img_logo from '../assets/img/logo.png'
import {
    Link
} from "react-router-dom";

const Header = ({home = false}) => {
  return (
    <div className="section-header">
      <div className="header-dark">
          <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container"><Link to="/" className='navbar-brand'><img src={img_logo} style={{width: "120px", height: "120px"}}/></Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item" role="presentation"><Link to='/gallery' className='nav-link'>Gallery</Link></li>
                            <li className="nav-item" role="presentation"><Link to='/wallet' className='nav-link'>Wallet</Link></li>
                        </ul>
                        <div class="header-social">
                            <div class="social-icon-group">
                                <a class="social-icon" href="#" title="Follow us on Twitter" target="_blank">
                                    <i class="fab fa-twitter" style={{"font-size":"32px"}}></i>
                                </a>
                                <a class="social-icon" href="#" title="Follow us on Discord" target="_blank">
                                    <i class="fab fa-discord" style={{"font-size":"32px"}}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
          {home? 
          <>
            
            <div className="container hero text-center">
                <div className="d-flex justify-content-around">
                <img src={web_image1} className="d-none d-sm-block"/>
                        <img src={web_image2} className="d-none d-sm-block"/>
                        <img src={web_image3}/>
                        <img src={web_image4} className="d-none d-lg-block"/>
                        <img src={web_image5} className="d-none d-lg-block"/>
                </div>
            </div>
            <br></br>
            <div className="header-description">
                <p className="text-1">Mishkas</p>
            </div>
            <div className="header-description">
                <p className="text-2"><span>Collection of 10,000 unique NFTs.</span></p>
                <p className="text-2"><span>3...2...1... BLAST OFF!</span></p>
            </div>
            <div className="header-description">
            </div>
            <div className="header-view-galery">
                <Link to='/gallery'>view gallery</Link>
                <br/><br/><br/>
            </div>
          </> : null}
          
      </div>
    </div>
  )
  
}

export default Header