import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './EditBusinessDetails.css'

/**
 * This component enables users to edit their business
 * page.
 * 
 */

const EditBusinessDetails = () => {

  const [businessData, setBusinessData] = useState({
    businessName: '',
    phone_Number: '',
    aboutUs: '',
    email: '',
    userID: ''
  })

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    getBusinessData()
  }, [])

  const navigate = useNavigate()
  const goToBusinessDetailsPage = () => navigate('/BusinessDetailsPage')

  //gets user business details from the database and sets it to state
  const getBusinessData = () => {
    axiosPrivate.get('/usersWithID/usersByID')
      .then((res) => {
        setBusinessData({
          businessName: res.data[0].businessName,
          phone_Number: res.data[0].phone_Number,
          aboutUs: res.data[0].aboutUs,
          email: res.data[0].email,
          userID: res.data[0].userID
        })
      })
      .catch((err) => console.log(err))
  }

  //performs business/userData Updates
  const updateUser = () => {
    console.log('user updated')
    axiosPrivate.patch('/usersWithID/usersByID', { businessData })
      .then((res) => {
        console.log(res)
        navigate('/BusinessDetailsPage'
        )
      })
      .catch((err) => (console.log(err)))

  }

  const preventReload = (e) => {
    e.preventDefault()
  }

  return (

    <div className='editBusinessDetailsForm'>
      <form onSubmit={preventReload} id='busDetailsFrm' className='busDetailsFrm'>
        <h1>Edit Business Details</h1>
        <div className='label-input'>
          <label>Business Name: </label>
          <input id='business-name' type='Text' value={businessData.businessName}
            onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })} className='business-name' placeholder='business Name'
          />
        </div>
        <div className='label-input'>
          <label>About Us:  </label>
          <textarea id='aboutUs' rows={6} type='Text' value={businessData.aboutUs}
            onChange={(e) => setBusinessData({ ...businessData, aboutUs: e.target.value })} className='aboutUs' placeholder='about Us'
          />
        </div>
        <div className='label-input'>
          <label>Business&nbsp;Phone: </label>
          <input id='phone-number' type='Number' value={businessData.phone_Number}
            onChange={(e) => setBusinessData({ ...businessData, phone_Number: e.target.value })} className='phone-number' placeholder='Business Phone No.'
          />
        </div>
        <div className='label-input'>
          <label>Business Email: </label>
          <input id='email' type='email' value={businessData.email}
            onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })} className='email' placeholder='Business email'
          />
        </div>

        <div className='done_Cancel'>
          <button className='cancel_Btnn' onClick={goToBusinessDetailsPage}>Cancel</button>
          <button className='done_Btn' onClick={updateUser}>Update</button>
        </div>
      </form>
    </div>
  )
}
export default EditBusinessDetails