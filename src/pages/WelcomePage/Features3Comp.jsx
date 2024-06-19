import React from 'react'
import './Features3Comp.css'
import { useNavigate } from 'react-router-dom'

const Features3Comp = () => {
  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')
  return (
    <section className='features1Container3'>
      {/* <div> */}
      <div className='features1ContentWrapper3'>
        <div className='describtionLearnMore3' data-aos='fade-right' data-aos-offset='400'>
          <div>AUTOMATED INVOICE</div>
          <h2>Automates Invoice Management </h2>
          <p>Invoices are calculated, organized and structured for you. Easily send
            invoices to all social media channels, Get notified on the various stages of your invoice life
            circle.
          </p>
          <button onClick={goToRegister}>Learn More </button>
        </div>
        <div className='features3Image' data-aos='fade-left' data-aos-offset='300'>
          <img src={require('../../assets/Invoice.png')} alt='BookKeeping' />
        </div>
      </div>
    </section>
  )
}

export default Features3Comp