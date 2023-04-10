import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbars from '../Navbar/Navbars'

export default function Layout({userData,setuserData}) {
  const nav= useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
setuserData(null)
nav('/login')
  }
  return (
    <>
    <Navbars userData={userData} logOut={logOut}/>
    <div className='container'>
      <Outlet/>
    </div>
    </>
  )
}