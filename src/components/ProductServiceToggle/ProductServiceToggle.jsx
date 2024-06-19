import React, { useState } from 'react'
import './ProductServiceToggle.css'
import AddServiceComp from '../AddServiceComp/AddServiceComp'
import AddProductComp from '../AddProductComp/AddProductComp'

/**
 * This component handles toggles between product and service components
 * by click of product and service buttons.
 */

const ProductServiceToggle = () => {
  const [showAddServiceComp, setShowAddServiceComp] = useState(false)
  const [showAddProductComp, setShowAddProductComp] = useState(true)

  const toggleServices = () => {
    setShowAddProductComp(false)
    setShowAddServiceComp(true)
  }
  const toggleProducts = () => {
    setShowAddProductComp(true)
    setShowAddServiceComp(false)
  }
  return (
    <>
      <div className='product_service_container'>
        <div className='product_service_wrapper'>
          <button key="key" className='product_Btn' onClick={toggleProducts} >Product</button>
          <button key="key" className='service_Btn' onClick={toggleServices} >Service</button>
        </div>
      </div>
      {showAddProductComp && <AddProductComp />}
      {showAddServiceComp && <AddServiceComp />}
    </>
  )
}

export default ProductServiceToggle