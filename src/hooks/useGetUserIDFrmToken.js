/**
 * This code is not being used anywhere in the Program.
 * It was left for study purposes.
 */

import useAuth from './useAuth'


//decode JWT to extract userId

const useGetUserIDFrmToken =()=>{
    const {auth} = useAuth()

    try{
       
        const tokenParts = auth?.accessToken.split('.')
        if(tokenParts.length !== 3){
            throw new Error('invalid JWT token format')
        }

       const payLoadBase64 = tokenParts[1]
       const payLoad = JSON.parse(atob(payLoadBase64))
       const userID = payLoad.sub

       return userID

    }catch(error){
        console.error('error decoding JWT:', error)
        return null
    }
    
}
export default useGetUserIDFrmToken;