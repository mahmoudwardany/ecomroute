import React, { useEffect, useState } from 'react'
import Slider from '../Slider/Slider'
import axios from 'axios'
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
export default function Home() {
  const [productList,setProduct]=useState([])
  let Base_Url="https://route-ecommerce.onrender.com/api/v1/products"

  async function getAllProducts(){
    let {data}=await axios.get(`${Base_Url}`)
    setProduct(data.data)
    $('.loading').fadeOut(2000)
  }
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div className='position-relative'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart</title>
            </Helmet>
      <div className='position-fixed loading justify-content-center align-items-center bottom-0 top-0 start-0 end-0'>
      <i className='fas fa-spinner fa-spin'></i>
      </div>
<Slider/>
<CategorySlider/>
<div     data-aos="fade-down"
    data-aos-easing="ease-in-out"
    data-aos-anchor-placement="top-center">
<div className='row g-3'>
  {productList.map((el)=>(
     

     <div className='col-md-2 items' key={el._id}>
    <Link className='nav-link' to={"/productDetails/"+el._id}>

      <div className='text-center h-25'>
<img src={el.imageCover} alt='' className='w-100'/>
<span className='text-success'>{el.category.name}</span>
<h2 className='h6 fw-bold'>{el.title.split(' ').splice(0,2).join('')}</h2>
<div className='d-flex justify-content-between'>
  <p>{el.price} $</p>
  <div>
    <StarRateIcon className='text-warning'/> {el.ratingsAverage}
     </div>
   </div>
   </div>

  </Link> 

  </div>
  
  ))}

</div></div>
    </div>
  )
}
