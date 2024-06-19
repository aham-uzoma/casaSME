import React from 'react'
import './Features2Comp.css'
import { useNavigate } from 'react-router-dom'

const Features2Comp = () => {
  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')
  return (
    <section className='features1Container2'>
      {/* <div> */}
      <div className='features1ContentWrapper2'>
        <div className='features2Image' data-aos='fade-left' data-aos-offset='300'>
          <img src={require('../../assets/inventory.png')} alt='BookKeeping' />
        </div>
        <div className='describtionLearnMore2' data-aos='fade-right' data-aos-offset='400'>
          <div>EASY INVENTORY</div>
          <h2>Smooth Inventory Management </h2>
          <p>Designed for everyone no need for tedious training process, a simple plug
            and play inventory management tool.
          </p>
          <button onClick={goToRegister}>Learn More </button>
        </div>
      </div>
    </section>
  )
}

export default Features2Comp