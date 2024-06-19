import React from 'react'
import './Features1Comp.css'
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom'

const Features1Comp = () => {
  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')
  return (
    <section className='features1Container' id='features'>
      {/* <div> */}
      <div className='features1ContentWrapper'>
        <div className='describtionLearnMore' data-aos='fade-right' data-aos-offset='300'>
          <div>YOUR BEST BOOKKEEPER</div>
          <h2>Smart BookKeeping From Anywhere</h2>
          <p>Seamlessly record all money In and money Out transactions
            at a go. know how your business perform daily though a
            quick snapshot of your business health.
          </p>
          <button onClick={goToRegister}>Learn More </button>
        </div>
        <div className='features1Image' data-aos='fade-left' data-aos-offset='400'>
          <img src={require('../../assets/BookKeeping.png')} alt='BookKeeping' />
        </div>
      </div>
    </section>
  )
}

export default Features1Comp