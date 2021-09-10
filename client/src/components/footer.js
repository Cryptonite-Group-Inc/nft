import React, {useState, useContext} from 'react'
import footer_img from '../assets/img/foot_logo.png'
import {
    Link
} from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
        <div className="container-fluid px-4">
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6">
                    <img src={footer_img} alt="Whatnot" className="footer-img"/>
                </div>
                <div className="col-md-12 col-lg-6">
                    <nav className="navbar navbar-dark navbar-expand">
                        <div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav ml-auto">
                                </ul>
                                <div className="header-social">
                                    <div className="social-icon-group">
                                        <a className="social-icon" href="#" title="Follow us on Twitter" target="_blank">
                                            <i className="fab fa-twitter" style={{'font-size':'32px'}}></i>
                                        </a>
                                        <a className="social-icon" href="#" title="Follow us on Discord" target="_blank">
                                            <i className="fab fa-discord" style={{'font-size':'32px'}}></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
  )
  
}

export default Footer