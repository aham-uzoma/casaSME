import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom'

/**
 * Footer for Logged In users
 */

const Footer = () => {

    const navigate = useNavigate()
    const goToInventory =()=>{navigate('/inventory')}
    const goToBookKeeping =()=>{navigate('/moneyIn')}
    const goToMoneyIn =()=>{navigate('/moneyIn')}
    const goToMoneyOut =()=>{navigate('/moneyOut')}
    const goToInvoice =()=>{navigate('/invoice')}

  return (
    <div className='blackSurfaceFooter'>
        <div className='blackFooterContentWidth'>
            <div>
            <h2>Services.</h2>
             <ul className='servicesLinks'>
              <li onClick={goToInventory}>Inventory</li>
              <li onClick={goToBookKeeping}>BookKeeping</li>
              <li onClick={goToInvoice}>Invoice</li>
              <li onClick={goToMoneyIn}>MoneyIn</li>
              <li onClick={goToMoneyOut}>MoneyOut</li>
             </ul>
            </div>
            <div>
            <h2>Follow Us:</h2>
            <li className='servicesLinks'>FaceBook</li>
              <li className='servicesLinks'>LinkedIn</li>
              <li className='servicesLinks'>Twitter</li>
              <li className='servicesLinks'>Instagram</li>
            </div>
        </div>
        <hr/>
        <div className='mustardvision'><p>2024 | Mustard Vision Technologies Ltd</p></div>
    </div>
  )
}

export default Footer