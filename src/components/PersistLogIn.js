import React, { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';

/**
 * This function keeps the user logged in even after page refresh or even
 * if the user leaves the app and comesback to the app
 */

const PersistLogIn = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const refreshTokenVerify = async () => {
      try {
        await refresh()
        setIsLoading(false) 
      } catch (err) {
        console.error(err)
        setIsLoading(false) 
      }
    };

    if (!auth?.accessToken) {
      refreshTokenVerify()
    } else {
      setIsLoading(false) 
    }
  }, [auth?.accessToken, refresh])

  return (
    <>
      {isLoading ? <p>Loading....</p> : <Outlet />}
    </>
  )
}

export default PersistLogIn


