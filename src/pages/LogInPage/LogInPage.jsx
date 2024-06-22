import React, { useState } from 'react'
import '../RegisterPage/RegisterPage.css'
import '../LogInPage/LogInPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import FlashMessages from '../../components/FlashMessages'

/**
 * This component handles logIn Process
 * 
 */

const LogInPage = () => {
  const [username, setUserName] = useState("")
  const [password, setPassWord] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { setAuth } = useAuth()

  const [severity, setSeverity] = useState("")
  const [themessage, setMessage] = useState("")
  const [open, setOpen] = useState(false)


  const handleUser_Name = (e) => {
    setUserName(e.target.value)
  }
  const handlePass_word = (e) => {
    setPassWord(e.target.value)
  }

  //use location to identify the page a user was before logOut
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const navigate = useNavigate()

  const goToRegister = () => navigate('/registerPage')
  const goToWelcome = () => { navigate('/welcome'); }


  const handleLogIn = () => {
    setIsLoading(true)
    Axios.post('/auth', JSON.stringify({ username, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
      .then(res => {
        const accessToken = res?.data?.accessToken
        setAuth({ username, accessToken })
        setIsLoading(false)
        setSeverity("success")
        setMessage("LogIn Successful");
        setOpen(true)
        setUserName('')
        setPassWord('')

        navigate(from, { replace: true })

      }).catch(err => {
        setIsLoading(false)
        setSeverity("error")
        setMessage("Username or Password is incorrect");
        setOpen(true)
        console.log(err)
      })
  }

  //cancles flash Messages
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  };

  return (
    <div className='logIn_div'>
      <div className='logIn_wrap'>
        <img onClick={goToWelcome} src={require('../../assets/casa.png')} alt='casaLogo' />
        <section><h1>Login</h1></section>
        <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />
        <form className='logInForms'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' className='input_field_round_edges' placeholder='Username' autoComplete='off' name='username_email' required
            onChange={handleUser_Name} />
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' className='input_field_round_edges' placeholder='Password' name='password'
            onChange={handlePass_word} required />
        </form>
        <button className='long_round_buttons' onClick={handleLogIn}>{isLoading === true ? <p>Loading...</p> : <p>LogIn</p>}</button>
        <p>You don't have an account?</p>
        <button className='long_round_buttons_transparent' onClick={goToRegister}>Register</button>
      </div>

    </div>)
}

export default LogInPage