import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import HeaderComp from './HeaderComp'
import HeroComp from './HeroComp'
import BrandsComp from './BrandsComp'
import Features1Comp from './Features1Comp'
import Features2Comp from './Features2Comp'
import Features3Comp from './Features3Comp'
import PricingComp from './PricingComp'
import TestimonialComp from './TestimonialComp'
import FooterComp from './FooterComp'




const WelcomePage = () => {
  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
    })
  }, [])

  return (

    <div >
      <HeaderComp />
      <HeroComp />
      <BrandsComp />
      <Features1Comp />
      <Features2Comp />
      <Features3Comp />
      <PricingComp />
      <TestimonialComp />
      <FooterComp />
    </div >
  )
}

export default WelcomePage