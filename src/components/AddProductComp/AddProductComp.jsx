import React, { useEffect, useState } from 'react'
import './AddProductComp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import FlashMessages from '../FlashMessages'
import StockItems from '../StockItems/StockItems'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This is the Add Product Component and it shows up in the inventory Page
 * when the product button is clicked after the add new product button is clicked.
 */

const AddProductComp = () => {
    const [productName, setProductName] = useState('')
    const [costPrice, setCostPrice] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [unitOfQuantity, setUnitOfQuantity] = useState('')
    const [quantityCount, setQuantityCount] = useState(1)
    const [newProductInv, setNewProductInv] = useState([])
    const [sellingPriceOfTotal, setSellingPriceOfTotal] = useState('')


    const [severity, setSeverity] = useState("");
    const [themessage, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [showStockItem, setShowStockItem] = useState(false)

    const axiosPrivate = useAxiosPrivate()


    const handleNameOfProducts = (e) => {
        setProductName(e.target.value)
    }
    const handleCostPrice = (e) => {
        setCostPrice(e.target.value)
    }
    const handleSellingPrice = (e) => {
        setSellingPrice(e.target.value)
    }
    const handleMeasurementUnits = (e) => {
        setUnitOfQuantity(e.target.value)
    }
    const productquantityIncrement = () => {
        setQuantityCount(quantityCount + 1)
    }
    const productquantityDecrement = () => {
        setQuantityCount(quantityCount - 1)
    }

    useEffect(() => {
        setSellingPriceOfTotal(quantityCount * sellingPrice)
    }, [quantityCount, sellingPrice])

    const saveNewProductInvData = () => {
        const newProductObj = { productName, costPrice, sellingPrice, unitOfQuantity, quantityCount, sellingPriceOfTotal }
        const newItemData2 = [...newProductInv, newProductObj]
        setNewProductInv(newItemData2)

        axiosPrivate.post('/inventory/invData', { productName, costPrice, sellingPrice, unitOfQuantity, quantityCount, sellingPriceOfTotal })//newItemData2
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        setNewProductInv(newItemData2)

        setSeverity("success");
        setMessage("Saved Successfully !!!");
        setOpen(true);
    }
    const saveProductFormValidation = (e) => {
        e.preventDefault()
        if (productName === '') {
            setSeverity("error")
            setMessage("product name field cannot be empty");
            setOpen(true)
        } else if (costPrice === 0) {
            setSeverity("error")
            setMessage("cost price field cannot be empty");
            setOpen(true)
        } else if (sellingPrice === 0) {
            setSeverity("error")
            setMessage("selling price field cannot be empty");
            setOpen(true)
        } else {
            saveNewProductInvData()
            setProductName('')
            setCostPrice(0)
            setSellingPrice(0)
            setUnitOfQuantity('')
            setQuantityCount(1)
            document.getElementById('productDetailsForm').reset()
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <div className='product_form_button_div'>
            <form id='productDetailsForm' className='productDetailsForm'>
                <input id='name_of_product' type='Text' className='name_of_product' placeholder='Product Name'
                    onChange={handleNameOfProducts} />
                <input id='cost_price' type='Number' className='cost_price' placeholder='Cost Price'
                    onChange={handleCostPrice} />
                <input id='selling_price' type='Number' className='selling_price' placeholder='Selling Price'
                    onChange={handleSellingPrice} />
                <select id='unit_of_measurement' value={unitOfQuantity} className='unit_of_measurement' name='selectUnit'
                    onChange={handleMeasurementUnits}>
                    <option>Select Unit Measurement</option>
                    <option>grams</option>
                    <option>kg</option>
                    <option>km</option>
                    <option>portion</option>
                    <option>cm</option>
                    <option>Bag</option>
                </select>
                <div className='totalSellingPriceDiv'>
                    <div>Total Selling Price: <span className='totalSellingPriceSpan'>{sellingPriceOfTotal}</span></div>
                </div>
                <div className='quantity'>
                    <div>Quantity:</div>
                    <div className='plus_minus'>
                        <FontAwesomeIcon className='plus_icon' icon={faPlus} onClick={productquantityIncrement} />
                        {quantityCount}
                        <FontAwesomeIcon icon={faMinus} onClick={productquantityDecrement} /></div>
                </div>
            </form>
            <button key="key" className='saveProducts_Btn' onClick={saveProductFormValidation} >Save</button>
            <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />
            {showStockItem && <StockItems productName={productName}
                sellingPrice={sellingPrice}
                costPrice={costPrice}
                quantityCount={quantityCount}
                newProductInv={newProductInv}
                unitOfQuantity={unitOfQuantity} />}
        </div>
    )
}

export default AddProductComp