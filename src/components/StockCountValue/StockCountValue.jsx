import React, { useEffect, useState } from 'react'
import './StockCountValue.css'
import ToggleProductService from '../ToggleProductService/ToggleProductService'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component facilitates and shows up stock Count and stock Value
 * right in the inventory page
 */

const StockCountValue = () => {
  const [showToggleProductService, setShowToggleProductService] = useState(false)
  const [stockItems, setStockItems] = useState([])

  const navigate = useNavigate()
  const goToOutofStockItems = () => navigate('/OutofStockItems')
  const axiosPrivate = useAxiosPrivate()


  //shows productServiceToggle and AddProductComp at once
  const showProductToggle = () => {
    setShowToggleProductService((showToggleProductService) => !showToggleProductService)
  }

  useEffect(() => {
    axiosPrivate.get('/newItems')
      .then((response) => {
        setStockItems(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  const stockCountArr = stockItems.map(item => { return item.quantityCount })
  const totalStockCount = stockCountArr.reduce((total, count) => total + count, 0)


  const stockValueArr = stockItems.map(item => {
    const sellingPrice = parseFloat(item.sellingPriceOfTotal)
    return isNaN(sellingPrice) ? 0 : sellingPrice // Handle NaN values
  })

  const totalStockValue = stockValueArr.reduce((total, stockValue) => total + stockValue, 0)

  const hasZeroQuantityCount = (item) => {
    return item.quantityCount === 0;
  }

  const outOfStockArr = stockItems.filter(hasZeroQuantityCount)
  const totalOutOfStockValue = outOfStockArr.length

  return (
    <div className='stock_addProduct_wrapper'>
      <div className='stocksButtonWrapper'>
        <div className='stockCountValuewrap'>
          <div className='stockCountWrap'>
            <div className='stockNumber'>{totalStockCount}</div>
            <div className='stockCountLabel'>Stock Count</div>

          </div>
          <div className='stockValueWrap'>
            <div className='stockValue'>NGN {totalStockValue.toLocaleString()}</div>
            <div className='stockValueLabel'>Stock Value</div>
            <div className='outOfStockNumber'>{totalOutOfStockValue}</div>
            <div className='outOfStockLabel' onClick={goToOutofStockItems}>Out of Stock </div>
          </div>
        </div>
        <hr className='borderline1' />
        <button className='addNewProduct' onClick={showProductToggle}>+ Add New Product</button>
      </div>
      {showToggleProductService && <ToggleProductService />}
    </div>
  )
}

export default StockCountValue