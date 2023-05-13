import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StarRateIcon from '@mui/icons-material/StarRate';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
export default function ProductDetails() {
  const [productDetail,setProductDetail]=useState()
  const {id}=useParams()
  let nav=useNavigate()
  useEffect(()=>{
    getProduct()
  },[])
 async function getProduct(){
let {data} = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
setProductDetail(data.data)
  }
 async function addToCart(id){
  let body={
    productId:id
  }
  let headers={
    token:localStorage.getItem('userToken')
  }
    let {data}=await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/cart`,body,{headers})
  console.log(data)
  if(data.status === 'success'){
    nav('/cart')
  }
  }
  return (
    <div>
      
      {productDetail !== undefined ?<div className='row justify-content-center mt-4 align-items-center'>
        <div className='col-md-4'>
          <OwlCarousel lassName='owl-theme' dotsEach={true} autoplay={true}
          autoplayTimeout={2000}  dots={true} loop items={1}>
            {productDetail.images.map((img,i)=>(
              <img height={400} src={img} alt='' className='w-100' key={i}/>
            ))}
          </OwlCarousel>
          
            </div>

        <div className='col-md-8 text-center'>
        <span className='text-success'>{productDetail.category.name}</span>
<h2 className='h6 fw-bold'>{productDetail.title}</h2>
<p  className='text-muted'>{productDetail.description}</p>
<div className='d-flex justify-content-between'>
  <p>{productDetail.price} EGP</p>
  <div>
    <StarRateIcon className='text-warning'/> {productDetail.ratingsAverage}
     </div>
          </div>
     <button className='btn btn-success w-100 mb-2' onClick={()=>addToCart(productDetail._id)}>Add To Cart</button>

        </div>
        </div>
         :""}
    </div>
  )
}
