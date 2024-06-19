import React, { useEffect } from 'react'
import './BrandsComp.css'
import 'aos/dist/aos.css'

const BrandsComp = () => {
  return (
    <section className='brandsSection' id='brands'>
      <div className='brandsImageWrapper' data-aos='fade-down' data-aos-offset='200'>
        <img src={require('../../assets/bianca.png')} alt='bianca fashion' />
        <img src={require('../../assets/boat.png')} alt='boat' />
        <img src={require('../../assets/only.png')} alt='only' />
        <img src={require('../../assets/sid.png')} alt='sid' />
        <img src={require('../../assets/sklz.png')} alt='sklz' />
      </div>
    </section>
  )
}

export default BrandsComp