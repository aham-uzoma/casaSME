import React, { useEffect } from 'react'
import './HeroComp.css'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'


const HeroComp = () => {
  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')

  return (
    <section className='heroContainer'>
      <div className='heroContentsWrapper'>
        <div className='textAndButtons'>
          <h1 data-aos='fade-down' data-aos-delay='500'>Manage Your Business with Casa</h1>
          <p data-aos='fade-down' data-aos-delay='600'>Bookkeeping  |  Invoice  |  Inventory</p>
          <div data-aos='fade-down' data-aos-delay='700'>
            <button onClick={goToRegister}>Sign Up</button>
            <span>14 days free trial</span>
          </div>
        </div>
        <div data-aos='fade-up' data-aos-delay='800'>
          <img src={require('../../assets/userComputer.png')} alt='userComputer' />
        </div>
      </div>
    </section>
  )
}

export default HeroComp