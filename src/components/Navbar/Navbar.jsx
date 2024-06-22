import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * The NavBar Component for Logged In Users.
 */

const Navbar = () => {
   const [toggleMenu, setToggleMenu] = useState(false)
   const [loggedInUser, setLoggedInUser] = useState([])

   const navigate = useNavigate()
   const goToWelcome = ()=>{ navigate('/welcome'); setToggleMenu(false)}
   const goToInventory = () => { navigate('/inventory'); setToggleMenu(false) }
   const goToBookKeeping = () => { navigate('/moneyIn'); setToggleMenu(false) }
   const goToInvoice = () => { navigate('/invoice'); setToggleMenu(false) }
   const goToHome = () => { navigate('/'); setToggleMenu(false) }
   const goToBusinessPage = () => { navigate('/BusinessDetailsPage'); setToggleMenu(false) }


   const axiosPrivate = useAxiosPrivate();


   useEffect(() => {
      axiosPrivate('/usersWithID/usersByID').then(
         (response) => {
            setLoggedInUser(response.data)
            console.log(`Respond: ${JSON.stringify(response)}`)
         }).catch((error) => console.log(error))
   }, [axiosPrivate])

   return (
      <nav className='app__navbar'>
         <div className='app__navbar-logo' onClick={goToWelcome}>
            <img src={require('../../assets/casa3.png')} alt='casaLogo' />
         </div>
         <ul className='app__navbar-links'>
            <li className='p__opensans' onClick={goToHome}>Dashboard</li>
            <li className='p__opensans' onClick={goToBookKeeping}>BookKeeping</li>
            <li className='p__opensans' onClick={goToInventory}>Inventory</li>
            <li className='p__opensans' onClick={goToInvoice}>Invoice</li>
         </ul>
         <div className='app__navbar-login' onClick={goToBusinessPage}><span>{loggedInUser.map(items => items.businessName)}</span>
         </div>
         <div className='app__navbar-smallscreen'>
            <FontAwesomeIcon icon={faBars} color='#fff' fontSize={18} onClick={() => { setToggleMenu(true) }} />

            {toggleMenu && (
               <div className='app__navbar-smallscreen_overlay'>
                  <FontAwesomeIcon icon={faXmark} color='#fff' fontSize={15} className='overlay__close' onClick={() => { setToggleMenu(false) }} />
                  <ul className='app__navbar-smallscreen-links'>
                     <li className='p__opensans' onClick={goToHome}>Dashboard</li>
                     <li className='p__opensans' onClick={goToBookKeeping}>BookKeeping</li>
                     <li className='p__opensans' onClick={goToInventory}>Inventory</li>
                     <li className='p__opensans' onClick={goToInvoice}>Invoice</li>
                  </ul>
               </div>

            )}
         </div>

      </nav>
   )
}

export default Navbar