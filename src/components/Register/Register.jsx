import React, { useState } from 'react'
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(true)
const nav=useNavigate()
  const validationSchema=Yup.object({
    name:Yup.string().min(3,'min is 3 char').max(15,'max is 15 char').required('Required'),
    email:Yup.string().email().required(),
    password:Yup.string().required('Required').min(8,'must be 8 or more').matches(/^[A-Z][a-zA-Z0-9!@$%^&*_-]{7,15}$/).max(15),
    rePassword:Yup.string().required().oneOf([Yup.ref('password')],'password must be matched'),
    phone:Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/,'enter valid phone')
      })
      const formRegister=useFormik({
        initialValues:{
          name:"",
          email:"",
          password:"",
          rePassword:"",
          phone:""
        },
        onSubmit:(val)=>{
          sentToApi(val)
  
        },
        validationSchema
       })
       async function sentToApi(user){
        setLoading(false)
        const {data}=await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',user).catch((err)=>{
setError(err.response.data.message)
console.log(err)
setLoading(true)
        })
       if(data.message === 'success'){
      setLoading(true)
        nav('/login')
       }
       }
  return (
    <div className='w-75'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
            </Helmet>
      <h1 className='text-success'>Register Now</h1>

      <form className='my-3' onSubmit={formRegister.handleSubmit} >
     {error?<div className='alert alert-danger'>{error}</div>:""}   
<label htmlFor="name">name</label>
        <input onChange={formRegister.handleChange} type="text"name='name'id='name'className='form-control' onBlur={formRegister.handleBlur}/>
        {formRegister.errors.name && formRegister.touched.name ?<div className='text-danger'>{formRegister.errors.name}</div>:""}
        <label htmlFor="email">email</label>
        <input onChange={formRegister.handleChange}  type="email"name='email'id='email'className='form-control'onBlur={formRegister.handleBlur} />
        {formRegister.errors.email && formRegister.touched.email?<div className='text-danger'>{formRegister.errors.email}</div>:""}

        <label htmlFor="password">password</label>
        <input onChange={formRegister.handleChange}  type="password"name='password'id='password'className='form-control' onBlur={formRegister.handleBlur}/>
        {formRegister.errors.password && formRegister.touched.password?<div className='text-danger'>{formRegister.errors.password}</div>:""}

        <label htmlFor="rePassword">rePassword</label>
        <input onChange={formRegister.handleChange}  type="password"name='rePassword'id='rePassword'className='form-control'onBlur={formRegister.handleBlur} />
        {formRegister.errors.rePassword && formRegister.touched.rePassword?<div className='text-danger'>{formRegister.errors.rePassword}</div>:""}


        <label htmlFor="phone">phone</label>
        <input onChange={formRegister.handleChange}  type="tel"name='phone'id='phone'className='form-control'onBlur={formRegister.handleBlur} />
       {formRegister.errors.phone && formRegister.touched.phone ?<div className='text-danger'>{formRegister.errors.phone}</div>:""}
        
       {loading ? <button disabled={!(formRegister.isValid && formRegister.dirty)} className='btn btn-success my-3'type='submit'>Register</button>:<i className='fas fa-spinner fa-spin'></i>}
        
</form>
      </div>
  )
}
