import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import './HeaderComp.css'
import 'aos/dist/aos.css'
import { Link, useNavigate } from 'react-router-dom'


const HeaderComp = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const navigate = useNavigate()
  const goToLogIn = () => navigate('/logIn')


  let navBar = document.querySelector('.app__navbar2')
  console.log('NAVBAR:', navBar);
  console.log('NAVBAR:', navBar)
  const threshold = 10

  useEffect(() => {
    if (navBar === null) {
      navBar = document.querySelector('.app__navbar2')
    } else if (navBar) {
      const threshold = 10;

      const handleScroll = () => {
        const scrolled = window.scrollY > threshold;
        if (scrolled) {
          navBar.classList.add('has-shadow');
        } else {
          navBar.classList.remove('has-shadow');
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [threshold])


  return (
    <nav className='app__navbar2'>
      <div className='app_navbar_content2'>
        <div className='app__navbar-logo2' data-aos='fade-down' data-aos-delay='1000'>
          <img src={require('../../assets/casa.png')} alt='casaLogo' />
        </div>
        <ul className='app__navbar-links2' data-aos='fade-down' data-aos-delay='1200' >

          <li className='p__opensans' ><a href="#brands">Brands</a></li>
          <li className='p__opensans' ><a href="#features">Features</a></li>
          <li className='p__opensans' ><a href="#pricing">Pricing</a></li>
          <li className='p__opensans' ><a href="#joinUs">Join Us</a></li>


        </ul>
        <div onClick={goToLogIn} data-aos='fade-down' data-aos-delay='1400'>
          <button className='app__getStartedButton2'>Log In</button>
        </div>

      </div>

      <div className='app__navbar-smallscreen2'>
        <div className='app__navbar-Small_logo2' data-aos='fade-down' data-aos-delay='1000'>
          <img src={require('../../assets/casa.png')} alt='casaLogo' />
        </div>
        <FontAwesomeIcon icon={faBars} color='#000' fontSize={18} onClick={() => { setToggleMenu(true) }} />
        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay2' data-aos='fade-down' data-aos-delay='400'>
            <FontAwesomeIcon icon={faXmark} color='#000' fontSize={15} className='overlay__close2' onClick={() => { setToggleMenu(false) }} />
            <ul className='app__navbar-smallscreen-links2'>
              <li className='p__opensans'><a href="#brands">Brands</a></li>
              <li className='p__opensans'><a href="#features">Features</a></li>
              <li className='p__opensans'><a href="#pricing">Pricing</a></li>
              <li className='p__opensans'><a href="#joinUs">Join Us</a></li>
              <li className='p__opensans'><a href="#login">LogIn</a></li>
            </ul>
          </div>

        )}
      </div>
    </nav>
  )
}

export default HeaderComp