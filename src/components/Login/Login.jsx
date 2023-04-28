import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
export default function Login({saveUser}) {
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(true)
const location=useLocation()
  const redirectPath=location.state?.path || '/ecomroute'

const nav=useNavigate()
  const validationSchema=Yup.object({
    email:Yup.string().email().required(),
    password:Yup.string().required('Required').min(8),
      })
      const formRegister=useFormik({
        initialValues:{
          email:"",
          password:"",
        },
        onSubmit:(val)=>{
          LoginInApi(val)
        },
        validationSchema
       })
      
       async function LoginInApi(user){
        setLoading(false)
        const {data}=await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',user).catch((err)=>{
setError(err.response.data.message)
setLoading(true)

        })
        setLoading(true)
     if(data.message === 'success'){
      localStorage.setItem('userToken',data.token)
      saveUser()
      setLoading(true)
      nav(redirectPath,{replace:true})
    }
       }
  return (
    <div className='w-75'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>
      <h1 className='text-success'>Login</h1>

      <form className='my-3' onSubmit={formRegister.handleSubmit} >
     {error?<div className='alert alert-danger'>{error}</div>:""}   
        <label htmlFor="email">email</label>
        <input onChange={formRegister.handleChange}  type="email"name='email'id='email'className='form-control' />
        {formRegister.errors.email ?<div className='text-danger'>{formRegister.errors.email}</div>:""}
        <label htmlFor="password">password</label>
        <input onChange={formRegister.handleChange}  type="password"name='password'id='password'className='form-control' />
        {formRegister.errors.password ?<div className='text-danger'>{formRegister.errors.password}</div>:""}
<Link to='/forgetpassword' className='mx-3'>Forget Password</Link>
<Link to='/register' className='mx-3'>Don't have Account </Link>

<br/>
        {loading ? <button disabled={!(formRegister.isValid && formRegister.dirty)} className='btn btn-success my-3'type='submit'>Login</button>:<i className='fas fa-spinner fa-spin bg-main'></i>}

</form>
      </div>
  )
}
