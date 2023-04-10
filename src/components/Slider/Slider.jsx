import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import silde1 from '../../assets/images/slider-image-1.jpeg'
import silde2 from '../../assets/images/slider-image-2.jpeg'
import silde3 from '../../assets/images/slider-image-3.jpeg'



export default function Slider() {
  return (
    <div className='row g-0 my-5'>
        <div className='col-md-9'>
        <OwlCarousel className='owl-theme' autoplay={true} autoplayTimeout={3000} loop items={1}>

            <img src={silde1} height={400} className='w-100'alt=''/>
            <img src={silde2} height={400} className='w-100'alt=''/>
 <img src={silde3} height={400} className='w-100'alt=''/>
            </OwlCarousel>
        </div>
 <div className='col-md-3'>
 <img src={silde2} height={200} className='w-100'alt=''/>
 <img src={silde3} height={200} className='w-100'alt=''/>
 </div>
</div>
  )
}
