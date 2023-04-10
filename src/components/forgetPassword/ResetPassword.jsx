import React, { useState } from 'react'
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {ImSpinner3} from 'react-icons/im'

import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(true)
const nav=useNavigate()
  const validationSchema=Yup.object({
    email:Yup.string().email().required(),
    newPassword:Yup.string().required('Required'),
      })
      const formRegister=useFormik({
        initialValues:{
          email:"",
          newPassword:"",
        },
        onSubmit:(val)=>{
            resetPassword(val)
        },
        validationSchema
       })
      
       async function resetPassword(user){
        setLoading(false)
        const {data}=await axios.put('https://route-ecommerce.onrender.com/api/v1/auth/resetPassword',user).catch((err)=>{
setError(err.response.data.message)
setLoading(true)

        })
        setLoading(true)
     if(data.token){
      setLoading(true)
       nav('/login') 
     }
       }
  return (
    <div className='w-75'>
      <h1>resetPassword</h1>
      <form className='my-3' onSubmit={formRegister.handleSubmit} >
     {error?<div className='alert alert-danger'>{error}</div>:""}   
        <label htmlFor="email">email</label>
        <input onChange={formRegister.handleChange}  type="email"name='email'id='email'className='form-control' />
        {formRegister.errors.email ?<div className='text-danger'>{formRegister.errors.email}</div>:""}
        <label htmlFor="newPassword">new Password</label>
        <input onChange={formRegister.handleChange}  type="password"name='newPassword'id='newPassword'className='form-control' />
        {formRegister.errors.password ?<div className='text-danger'>{formRegister.errors.password}</div>:""}
        {error ? <div className='alert alert-danger'>{error}</div>:""}
        {loading ? <button disabled={!(formRegister.isValid && formRegister.dirty)} className='btn btn-info my-3'type='submit'>Update Password</button>:<ImSpinner3/>}
</form>
      </div>
  )
}
