
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserProtectWrapper({children}) {
  const navigate=useNavigate();
  const token=localStorage.getItem('token')
  // console.log(token)
  if(!token){
    navigate('/login')
  }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
