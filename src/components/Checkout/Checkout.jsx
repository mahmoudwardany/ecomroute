import axios from 'axios';
import {  useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

export default function Checkout() {
  const {cartId}=useParams()
      const formRegister=useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },
        onSubmit:(val)=>{
            checkoutPayment(val,cartId)
  
        },
       })
 async function checkoutPayment(val,id){
    let body={
        shippingAddress:val
    }
    let headers={
        token:localStorage.getItem('userToken')
    }
const {data}=await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,body,{headers})
 
console.log(data)
if(data.status === 'success'){
    window.open(data.session.url,'_blank')
}
} 
       
  return (
    <div className='w-75'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Check out</title>
            </Helmet>
      <h1>Login</h1>

      <form className='my-3' onSubmit={formRegister.handleSubmit} >
        <label htmlFor="details">details</label>
        <input onChange={formRegister.handleChange}  type="text"name='details'id='details'className='form-control' />
        {formRegister.errors.details ?<div className='text-danger'>{formRegister.errors.details}</div>:""}
        <label htmlFor="phone">phone</label>
        <input onChange={formRegister.handleChange}  type="tel"name='phone'id='phone'className='form-control' />
        {formRegister.errors.phone ?<div className='text-danger'>{formRegister.errors.phone}</div>:""}
        <label htmlFor="city">city</label>
        <input onChange={formRegister.handleChange}  type="text"name='city'id='city'className='form-control' />
        {formRegister.errors.city ?<div className='text-danger'>{formRegister.errors.city}</div>:""}
        <button disabled={!(formRegister.isValid && formRegister.dirty)} className='btn btn-success my-3'type='submit'>Pay</button>
</form>
      </div>
  )
}
