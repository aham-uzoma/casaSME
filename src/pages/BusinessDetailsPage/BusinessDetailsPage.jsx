import React, { useEffect, useState } from 'react'
import './BusinessDetailsPage.css'
import { useNavigate } from 'react-router-dom'
import useLogOutHook from '../../hooks/useLogOutHook'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Axios from '../../api/axios'



/**
 * This component displays business details page
 * from the database, users are regarded as businesses in
 * this platform, reason why you have userID as well as businessName
 * 
 */

const BusinessDetailsPage = () => {
  const [businessDetails, setBusinessDetails] = useState([])
  const [imageData, setImageData] = useState(null)
  const [newAvatar, setNewAvatar] = useState(null)
  const [showUploadImgBtn, setShowUploadImgBtn] = useState(false)
  const [userIDObj, setUserID] = useState({ user_ID: '' })
  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()
  const logOut = useLogOutHook()

  useEffect(() => {
    axiosPrivate.get('/usersWithID/usersByID').then(
      (response) => {
        setBusinessDetails(response.data)
        setImageData(response.data[0].avatar)
        setUserID({ user_ID: response.data[0].userID })
      }).catch((error) => console.log(error))
  }, [axiosPrivate])

  const handleLogOut = async () => {
    try {

      const result = await logOut()
      navigate('/logIn')

    } catch (error) {
      console.error('Logout Failed', error)
    }
  }
  const handleImageupdate = (e) => {
    setNewAvatar(e.target.files[0])
  }
  const showUploadBtn = () => {
    setShowUploadImgBtn(true)
    console.log('imageData:', imageData)

  }
  const hideUploadBtn = () => {
    setShowUploadImgBtn(false)
  }

  const handleImageUpdate = async () => {
    const formData = new FormData()
    const userID = userIDObj.user_ID
    formData.append('newAvatar', newAvatar)
    formData.append('userID', userID)

    await Axios.post('/usersPic/updatePhoto', formData).then((res) => {
      window.location.reload();
    }).catch((error) => console.log(error))

  }

  return (
    <>
      <div className='blackSurface_Bus'><h1>Business Profile Page.</h1></div>
      <div className='businessPage'>
        <div className='businessPageDetails'>
          <div className='avatar_logOut'>
            <div className='avatar_circle'>
              {imageData && <img src={`https://casasmeapi.onrender.com/static/${imageData}`} alt='User Avatar'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }} />}
            </div>
            <div className='Edit_profile_logOut'>
              <div className='businessName'><h2>{businessDetails.map(items => items.businessName)} </h2></div>
              <button className='edit_profile_btn' onClick={() => navigate('/EditBusinessDetails')}>Edit Profile</button>
              {showUploadImgBtn && <><label htmlFor="fileInput" className="pictureLabel">
                Choose a Picture
              </label>
                <input type='file' id='fileInput' className='select_a_picture' name="newAvatar" accept="image/*" onChange={handleImageupdate} />
                <div className='alignBtns'>
                  <button className='updateBtn' onClick={handleImageUpdate}>Update</button>
                  <button className='cancleBtn' onClick={hideUploadBtn} >Cancel</button></div>

              </>
              }
              <div className='update_logOut'>
                <p className='updatePhoto' onClick={showUploadBtn}>Update Picture</p>|<p className='logOut' onClick={handleLogOut}>LogOut</p></div>
            </div>

          </div>
          <div className='businessInfo'>
            <div><h2>Business.</h2>
              <ul className='bus_name_about_bus'>
                <li>Business Name - {businessDetails.map(items => items.businessName)}</li>
                <li>About Us <li>{businessDetails.map(items => items.aboutUs)}</li></li>
              </ul>
            </div>
            <div><h2>Contact.</h2>
              <ul className='phone_email'>
                <li>Business Phone Number - {businessDetails.map(items => items.phone_Number)} </li>
                <li>Business Email - {businessDetails.map(items => items.email)} </li>
                <li>Address- </li>
                <li>State- </li>
                <li>Country- </li>
              </ul>
            </div>
            <div><h2>User.</h2>
              <ul className='userDetails'>
                <li>Username - {businessDetails.map(items => items.username)} </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessDetailsPage