import React, { useState } from 'react'
import './PricingComp.css'
import { pricing } from '../../data'
import CheckMark from '../../iconsComp/CheckMark/CheckMark'
import { useNavigate } from 'react-router-dom'

const PricingComp = () => {
  const [index, setIndex] = useState(1);
  const [boxShadow, setBoxShadow] = useState('0 25px 50px -12px rgba(0, 0, 0, 0.25)');
  const [backgroundColor, setBackgroundColor] = useState('#faea11')

  const navigate = useNavigate()
  const goToRegister = () => navigate('/registerPage')
  const { title, cards } = pricing;

  return (
    <section className='pricingSection' id='pricing'>
      <div className='pricingSectionContent'>
        <h2
          style={{ margin: 32 }}
          data-aos='fade-down' data-aos-delay='300'
        >{title}</h2>
        <div className='pricingCardsContainer'>
          {cards.map((card, cardIndex) => {
            //destructure card
            const { icon, title, services, price, userAmount,
              btnText, delay } = card;
            const boxShadowConditional = cardIndex === index ? boxShadow : '0 5px 10px rgba(0, 0, 0, 0.1)';
            const buttonColor = cardIndex === index ? backgroundColor : '';

            return <div key={cardIndex} data-aos='zoom-in' data-aos-delay={delay} >
              {console.log('cardIndex', cardIndex)}
              <div className='pricingCard'
                style={{ boxShadow: boxShadowConditional }}
                onClick={() => setIndex(cardIndex)}>
                <div style={{ marginBottom: 32 }}>{icon}</div>
                <div style={{ fontSize: 32, marginBottom: 32, fontWeight: 600 }}>{title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {services.map((service, index) => {
                    const { name } = service
                    return <div key={index} className='servicesCheckMarks'>
                      <CheckMark color='rgb(150, 150, 150)' />
                      <div>{name}</div>
                    </div>
                  })}
                </div>
                <div style={{ marginBottom: 2 }}>
                  <div>
                    <span style={{ fontSize: 24, fontWeight: 600 }}>{price}/</span>
                    <span style={{ fontSize: 20, color: 'rgb(150, 150, 150)', fontWeight: 300 }}>year</span>
                  </div>
                </div>
                <div style={{ fontSize: 16, color: 'rgb(150, 150, 150)', marginBottom: 32 }}>{userAmount}
                </div>
                <button className='pricingButton'
                  onClick={goToRegister}
                  style={{ backgroundColor: buttonColor }}>
                  <span>{btnText}</span>
                </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingComp