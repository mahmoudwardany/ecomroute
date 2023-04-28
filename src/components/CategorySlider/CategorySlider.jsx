import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';


export default function CategorySlider() {
  
  const[categories,setcategories] = useState([]);

  async function getCategories() {
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setcategories(data.data)
  }
  useEffect(()=> {
    getCategories()
  },[])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed:1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return <>
  <div className="container  my-5">
  <h3>Shop Poular Caregories</h3>
  <Slider {...settings}>
        {categories.map(( category) => <div  key={category._id}>
          <div className='mx-4'>
            <img className='w-100' height={200} src={category.image} alt="" />
          <h2 className='h6 pt-2 tex-center ms-3'>{category.name}</h2>
          </div>
          
        </div>)}
       </Slider>
  </div>
       
    </>
  
}
