import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './EdittInventory.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component as the name implies, handles inventory editting.
 */

const EdittInventory = () => {
  let { id } = useParams()

  const [stockDetails, setStockDetails] = useState({
    productName: '',
    costPrice: '',
    sellingPrice: '',
    unitOfQuantity: '',
    sellingPriceOfTotal: '',
    quantityCount: ''
  })

  const axiosPrivate = useAxiosPrivate()

  const getStockItem = () => {
    axiosPrivate.get(`/newItems/${id}`
    ).then((res) => {
      setStockDetails({
        productName: res.data.productName,
        costPrice: res.data.costPrice,
        sellingPrice: res.data.sellingPrice,
        unitOfQuantity: res.data.unitOfQuantity,
        sellingPriceOfTotal: res.data.sellingPriceOfTotal,
        quantityCount: res.data.quantityCount
      })
    }).catch((e) => console.log('something went wrong :(', e))
  }

  useEffect(() => {
    getStockItem()
  }, [])

  const navigate = useNavigate()
  const goToInventory = () => navigate('/Inventory')

  const preventReload = (e) => {
    e.preventDefault()
  }
  const updateStockItem = () => {
    try {
      axiosPrivate.patch(`/newItems/${id}`, { stockDetails }).then((res) => { console.log(res) })
      goToInventory()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (

    <div className='editInventoryForm'>
      <form onSubmit={preventReload} id='productDetailsFrm' className='productDetailsFrm'>
        <h1>Edit Product</h1>
        <div className='block'>
          <label>Product Name: </label>
          <input id='name_of_productt' type='Text' value={stockDetails.productName}
            onChange={(e) => setStockDetails({ ...stockDetails, productName: e.target.value })} className='name_of_productt' placeholder='Product Name'
          />
        </div>
        <div className='block'>
          <label>Cost Price:  </label>
          <input id='cost_pricee' type='Number' value={stockDetails.costPrice}
            onChange={(e) => setStockDetails({ ...stockDetails, costPrice: e.target.value })} className='cost_pricee' placeholder='Cost Price'
          />
        </div>
        <div className='block'>
          <label>Selling Price: </label>
          <input id='selling_pricee' type='Number' value={stockDetails.sellingPrice}
            onChange={(e) => {

              const newSellingPrice = parseFloat(e.target.value)
              const newTotalPrice = newSellingPrice * stockDetails.quantityCount

              setStockDetails({
                ...stockDetails, sellingPrice: newSellingPrice,
                sellingPriceOfTotal: newTotalPrice
              })

            }} className='selling_pricee' placeholder='Selling Price'
          />
        </div>
        <div className='block'>
          <label>Measurment : </label>
          <select id='unit_of_measurementt' value={stockDetails.unitOfQuantity}
            onChange={(e) => setStockDetails({ ...stockDetails, unitOfQuantity: e.target.value })} className='unit_of_measurementt' name='selectUnit'
          >
            <option>Select Unit Measurement</option>
            <option>grams</option>
            <option>kg</option>
            <option>km</option>
            <option>portion</option>
            <option>cm</option>
            <option>Bag</option>
          </select>
        </div>
        <div className='block'>
          <label>Total Selling Price: </label>
          <span className='totalSellingPriceNumba'>{stockDetails.sellingPriceOfTotal}</span>
        </div>

        <div className='done_Cancel'>
          <button className='cancel_Btnn' onClick={goToInventory}>Cancel</button>
          <button className='done_Btn' onClick={updateStockItem}>Done</button>

        </div>
      </form>
    </div>
  )
}

export default EdittInventory