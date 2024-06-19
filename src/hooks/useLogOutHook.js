import axios from '../api/axios';

/**
 * This hook interfaces with the api which
 * communicates with the database for the 
 * necessary credentials for logOut.
 * 
 */

const useLogOutHook = () => {

   const logOut = async () => {
      try {

         const response = await axios.get('/logOut', {
            withCredentials: true
         })

         return response.data
      } catch (error) {
         console.error('Error during LogOut', error)
         throw error
      }
   }
   return logOut

}

export default useLogOutHook