import React from 'react'
import './TestimonialComp.css'
import { useNavigate } from 'react-router-dom'

const TestimonialComp = () => {
  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')

  return (
    <section className='testimonialSection' id='joinUs'>
      <div className='testimonialContent'>
        <div className='aboutUsBackground'>
          <img src={require('../../assets/about.jpg')} alt='about' data-aos='zoom-in' data-aos-delay='300' />
          <div className='casaAboutContainer'>
            <h2 data-aos='fade-left' data-aos-delay='500'>Join Over 50 thousand SME Businesses Using Casa</h2>
            <p data-aos='fade-left' data-aos-delay='500'>Enjoy Unlimited Access For 14-days Free Trial</p>
            <button data-aos='fade-up' data-aos-delay='600' onClick={goToRegister}>Get Started</button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialComp