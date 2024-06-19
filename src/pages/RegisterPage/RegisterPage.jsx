import React, { useState } from 'react'
import './RegisterPage.css'
import Axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import FlashMessages from '../../components/FlashMessages'

/**
 * This component facilitates user/Business 
 * registration process
 * 
 */

const RegisterPage = () => {
  const [businessName, setBusinessName] = useState("")
  const [phone_Number, setPhone_Number] = useState(0)
  const [email, setEmail] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [severity, setSeverity] = useState("")
  const [themessage, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const gotoLogIn = () => navigate('/login')

  //handles form inputs
  const handleBusinessName = (e) => {
    setBusinessName(e.target.value)
  }
  const handlePhone_number = (e) => {
    setPhone_Number(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleUserName = (e) => {
    setUserName(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleImage = (e) => {
    setAvatar(e.target.files[0])
  }

  // Validating email using regular expression
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email)
  }

  //perform form validation
  const handleRegisterFormValidation = () => {
    if (businessName === "") {
      setSeverity("error")
      setMessage("Please Enter a Business Name")
      setOpen(true)
    } else if (phone_Number === 0) {
      setSeverity("error")
      setMessage("Please Enter a Phone Number")
      setOpen(true)
    } else if (email === "") {
      setSeverity("error")
      setMessage("Please Enter an Email")
      setOpen(true)
    } else if (!validateEmail(email)) {
      setSeverity("error")
      setMessage("Enter a valid Email Format")
      setOpen(true)
    } else if (username === "") {
      setSeverity("error")
      setMessage("Please Enter a username")
      setOpen(true)
    } else if (password === "") {
      setSeverity("error")
      setMessage("Please set your password")
      setOpen(true)
    } else if (avatar === null) {
      setSeverity("error")
      setMessage("Please upload a business profile pic")
      setOpen(true)
    } else
      setIsLoading(true)

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)

  }


  //Submit Data to db using formData and Axios
  const handleSubmit = async (e) => {
    e.preventDefault()
    handleRegisterFormValidation()
    const formData = new FormData()
    formData.append('businessName', businessName)
    formData.append('phone_Number', phone_Number)
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('avatar', avatar)

    try {
      // Send the FormData object via Axios
      const response = await Axios.post('/users', formData
      )
      if (response.data.status) {
        setSeverity("success")
        setMessage("Registration Successfull !!!");
        setOpen(true)
        navigate('/logIn')
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    <div className='registeration_div'>
      <div className='registration_wrap'>
        <section><h1>Register</h1></section>
        {/* encType="multipart/form-data" ---for reference purposes*/}
        <form className='registerForms'>
          <input type='text' className='input_field_round_edges' placeholder='Business name' autoComplete='off' name='bussinessName'
            onChange={handleBusinessName} />
          <input type='number' className='input_field_round_edges' placeholder='Phone number' autoComplete='off' name='phoneNumber'
            onChange={handlePhone_number} />
          <input type='email' className='input_field_round_edges' placeholder='Email' autoComplete='off' name='email'
            onChange={handleEmail} />
          <p>...</p>
          <input type='text' className='input_field_round_edges' placeholder='Username' autoComplete='off' name='user_name'
            onChange={handleUserName} />
          <input type='password' className='input_field_round_edges' placeholder='Password' autoComplete='off' name='password'
            onChange={handlePassword} />
          <label htmlFor="fileInput" className="pictureLabel">
            Choose a Picture
          </label>

          <input type='file' id='fileInput' className='select_a_picture' name="avatar" accept="image/*" onChange={handleImage} />

        </form>
        <button className='long_round_buttons' onClick={handleSubmit}>{isLoading === true ? <p>Loading...</p> : <p>Register</p>}</button>
        <p>Already have an account?</p>

        <button className='long_round_buttons_transparent' onClick={gotoLogIn}>Login</button>


      </div>
      <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />
    </div>
  )
}

export default RegisterPage