import { useNavigate } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'

/**
 * This component is no longer being used in 
 * any part of this application. The dashBoard represented
 * by HomeLayOutt currently acts as the home Screen
 * 
 */

const Home = () => {

  const navigate = useNavigate()
  const gotoDashBoard = () => navigate('/dashboard')
  const { refresh } = useRefreshToken()


  return (
    <div className='invoiceData'><h1>HOME PAGE</h1>

      <div className='itemSaveBtndiv'><button className='itemSaveBttn' onClick={gotoDashBoard}>Dashboard</button></div>

      <div className='itemSaveBtndiv'><button className='itemSaveBttn' onClick={refresh}>Refresh</button></div>

    </div>
  )
}

export default Home