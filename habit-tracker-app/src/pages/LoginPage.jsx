import React from 'react'
import { GoogleLogin,googleLogout } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
const LoginPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen bg-pink-200'>
      <div className='bg-white p-8 rounded-lg shadow-md h-1/2 w-1/3 flex flex-col justify-center items-center'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to Build Habits!!</h1>
        <p className='text-gray-600 mb-6'>Please sign in to continue</p>
        <GoogleLogin 
        onSuccess={(credentialResponse) =>{
            console.log(jwtDecode(credentialResponse.credential));
            navigate('/users')
        }} 
        onError={console.log("Error logging in")}
        auto_select={true}
        />
      </div>
    </div>
  )
}

export default LoginPage
