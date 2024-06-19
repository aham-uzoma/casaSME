import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/**
 * check if the user is logged in or not
 * this is a function that will help us protect our routes (protected Routes)
 */

const RequireAuth = () => {
   const { auth } = useAuth()
   const location = useLocation()
   return (
      auth?.accessToken ? <Outlet /> : <Navigate to='/welcome' state={{ from: location }} replace />
   )
}
export default RequireAuth