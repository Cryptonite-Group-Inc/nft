import React, {useState, useContext, useEffect} from 'react'
import icon_star from '../assets/img/icon_star.png'
import icon_moon from '../assets/img/icon_moon.png'
import icon_diamond from '../assets/img/icon_diamond.png'
import {AppContext, connectWallet} from '../context/app'

const timeDiff = (current, end) => {
    let diff = Math.max(end - current, 0);
    let days = Math.floor(diff / (1000 * 3600 * 24))
    diff = diff % (1000 * 3600 * 24)
    let hours = Math.floor(diff / (3600000))
    diff = diff % 3600000
    let minutes = Math.floor(diff / 60000)
    diff = diff % 60000
    let seconds = Math.floor(diff / 1000)
    return diff == 0? 'Sale was over!' :  `${days} days ${hours}:${minutes}:${seconds} until all Uglys are revealed!`
}

const SaleProgress = ({clickHandler}) => {
  const {state, dispatch} = useContext(AppContext)
  const [stock, setStock] = useState(0)
  const [diff, setDiff] = useState(timeDiff(new Date().getTime(), 1618585200000))
  useEffect(async () => {
    // Connect chain and get price, stock value
    try {
      let totalSupply = await state.contract.methods.totalSupply().call();
      setStock(totalSupply)  
    } catch (error) {
      
    }
    
  }, [state.contract]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(timeDiff(new Date().getTime(), 1618585200000))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-progress">
        <div className="text-center container py-4">
            <button className="btn btn-light" onClick={clickHandler}><b>Buy Uglys Here</b></button>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-11 col-sm-12 text-center">
                    <table className="sale__progress-box">
                        <tbody>
                        <tr>
                            <td>10,000 NFTs</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="sale__progress-box-progress">
                                    <div className="sale__progress-box-bar" id="offering_pb0" style={{width: `${Math.max(0, (stock) / 100)}%`}}>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>0.06 ETH</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="section-progress-desc">
                <p className="text-1"><b>{diff}</b></p>
            </div>
            <div className="section-progress-items">
                <div className="row justify-content-between">
                    <div className="col-lg-4">
                        <div className="progress-item">
                            <img src={icon_star}/>
                            <span>Unique artwork</span>
                            <p>Each Uglys has a unique style combination with no two artwork that are alike</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="progress-item">
                            <img src={icon_moon}/>
                            <span>Full Ownership</span>
                            <p>Full rights and freedom to do anything you would like with your artwork</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="progress-item">
                            <img src={icon_diamond}/>
                            <span>Fair Distribution</span>
                            <p>Randomized distribution of artwork to ensure fairness</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SaleProgress