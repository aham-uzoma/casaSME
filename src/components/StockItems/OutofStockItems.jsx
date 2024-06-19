import React, { useEffect, useState } from 'react'
import './OutofStockItems.css'
import StockItemList from './StockItemList';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

/**
 * This component handles the Identification of Items that are Out of stock
 */

const OutofStockItems = () => {
  const [allStockItems, setAllStockItems] = useState([])

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    axiosPrivate.get('/newItems')
      .then((response) => {
        setAllStockItems(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  //checks for Items that has zero quantity count
  const hasZeroQuantityCount = (item) => {
    return item.quantityCount === 0;
  }

  const outOfStockArr = allStockItems.filter(hasZeroQuantityCount)

  return (
    <>
      <div className='blackSurface_Inv'><h1>Inventory.</h1></div>
      <div className='inventoryDiv'>
        <div className='inventory_wrapper'>
          <div className='StockItemsList_Wrapper'>
            <div className='searchAddDelete_Wrapper'></div>
            {outOfStockArr.length > 0 ? (
              outOfStockArr.slice(0).reverse().map((details) => {
                const { productName, sellingPrice, quantityCount } = details
                return (
                  <StockItemList key={details.productName} productName={productName}
                    sellingPrice={sellingPrice}
                    quantityCount={quantityCount}
                    details={details} />
                )
              })) : (<h1>No results found!</h1>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default OutofStockItems