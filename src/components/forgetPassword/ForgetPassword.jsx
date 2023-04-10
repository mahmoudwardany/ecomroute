import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ImSpinner3 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
    const [codeFlag,setCode]=useState(true)
    const [error,setError]=useState('')
  const [loading,setLoading]=useState(true)

const nav=useNavigate()
    const validationSchema=Yup.object({
        email:Yup.string().email('enter Valid Email').required('Required'),
    })
    const form1=useFormik({
initialValues:{
    email:""
},
onSubmit:(val)=>{
    forgetPassword(val)
},
validationSchema
    })
    const form2=useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:(val)=>{
            console.log(val)
            verifyCode(val)
        }            })
    async function forgetPassword(objData){
        setLoading(false)
        let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,objData).catch((error)=>{
            setError(error.response.data.message)
setLoading(true)

        })
setLoading(true)
        if(data.statusMsg === 'success'){
setLoading(true)
            setCode(false)
        }else{
            console.log(data.statusMsg)
        }
    }
   
    async function verifyCode(objData){
        setLoading(false)
        let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,objData).catch((error)=>{
            setError(error.response.data.message)
setLoading(true)

        })
        console.log(data)
        setLoading(true)
        if(data.status=== 'Success'){
            setLoading(true)
            nav('/resetpassword')
        }
    }
   
  return (
    <div className='container text-center'>
        {codeFlag === true?
        <>
        <h1>ForgetPassword</h1>
        <form onSubmit={form1.handleSubmit} className='w-75 text-start'> 
        <label htmlFor="email">email</label>
        <input onChange={form1.handleChange}  type="email"name='email'id='email'className='form-control' />
        {form1.errors.email ?<div className='text-danger'>{form1.errors.email}</div>:""}
        {error !== ''?<div className='alert alert-danger mt-3'>{error}</div> :""}
        {loading ? <button type='submit'className='btn btn-success mt-3'>Send Message</button>:<ImSpinner3/> }
        </form> </> :
        <>
        <h1>Verify Reset Code</h1>
        <form onSubmit={form2.handleSubmit} className='w-75 text-start'> 
        <label htmlFor="resetCode">Reset Code</label>
        <input onChange={form2.handleChange}  type="text"name='resetCode' id='resetCode'className='form-control' />
        {error !== ''?<div className='alert alert-danger mt-3'>{error}</div> :""}
        {loading ? <button type='submit'className='btn btn-success mt-3'>Reset Code </button>:<ImSpinner3/> }
       
        </form> </>}
       
        </div>
  )
}
