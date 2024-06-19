import React from 'react'
import './FooterComp.css'
import { useNavigate } from 'react-router-dom'

const FooterComp = () => {
  const navigate = useNavigate()
  const goToLogIn = () => navigate('/logIn')
  return (
    <footer className='footerSection'>
      <div className='footerSectionContainer'>
        <div className='imageLogo' data-aos='fade-up' data-aos-delay='1000'>
          <img src={require('../../assets/casa.png')} alt='casaLogo' />
        </div>
        <div className='links_ul' data-aos='fade-up' data-aos-delay='1200'>
          <div className='links'>LINKS</div>
          <ul>
            <li className='p__list'><a href='/'>Home</a></li>
            <li className='p__list'><a href='#brands'>Brands</a></li>
            <li className='p__list'><a href='#features'>Features</a></li>
            <li className='p__list'><a href='#pricing'>Pricing</a></li>
            <li className='p__list'><a href='#joinUs'>JoinUs</a></li>
            <li className='p__list'><a href='#'>Careers</a></li>
            <li className='p__list' onClick={goToLogIn} >LogIn</li>

          </ul>
        </div>
        <div className='legal_ul' data-aos='fade-up' data-aos-delay='1400'>
          <div className='legal'>SOCIAL</div>
          <ul>
            <li className='p__list2'><a href='#'>Facebook</a></li>
            <li className='p__list2'><a href='#'>Instagram</a></li>
            <li className='p__list2'><a href='#'>Twitter</a></li>
            <li className='p__list2'><a href='#'>Snapchat</a></li>
            <li className='p__list2'><a href='#'>Tiktok</a></li>
            <li className='p__list2'><a href='#'>Blog</a></li>
          </ul>
        </div>
        <div className='newsLetterForm' data-aos='fade-up' data-aos-delay='1600'>
          <div className='newsLetter'>NEWSLETTER</div>
          <div className='newsletterSubtitle'>Over 25000 People Have Subscribed</div>
          <form className='newsLetterFormInput'>
            <div >
              <input type='text' placeholder='Enter Your Email' />
              <button>Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div className='mustardvision2' data-aos='fade-up' data-aos-delay='1800'>
        <hr className='hr2' />
        <p>2024 | Mustard Vision Technologies Ltd</p>
        <div>Copyright @2024 Mustard</div>
      </div>
    </footer>
  )
}

export default FooterComp