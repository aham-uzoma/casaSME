import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPenClip, faPlus } from '@fortawesome/free-solid-svg-icons'
import FlashMessages from '../FlashMessages'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component displays the details of one particular stock Item as a card.
 */

const StockItemList = ({ productName, sellingPrice, costPrice, quantityCount, details, showCheckBox, handlecheckbox, unitOfQuantity }) => {

    const [showPlusMinus, setShowPlusMinus] = useState(false)
    const [showStockCount, setShowStockCount] = useState(true)
    const [itemCount, setItemCount] = useState(quantityCount) 
    const [sellinPrice, setSellinPrice] = useState(sellingPrice)
    const [sellingPriceOfTotal, setSellingPriceOfTotal] = useState('')

    const [severity, setSeverity] = useState("");
    const [themessage, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const axiosPrivate = useAxiosPrivate()

    const showStockUpdateBtn = () => {
        setShowPlusMinus(true)
        setShowStockCount(false)
    }
    const showStockCountBtn = () => {
        setShowPlusMinus(false)
        setShowStockCount(true)
    }
    const itemIncrement = () => {
        setItemCount(itemCount + 1)
    }
    const itemDecrement = () => {
        setItemCount(itemCount - 1)
    }

    //calculates and shows the sellingPrice of a particular Item
    //by multiplying the selling price of one Item by the total 
    //quantity count of the item.
    useEffect(() => {
        setSellingPriceOfTotal(sellinPrice * itemCount)
    }, [sellinPrice, itemCount])

    //updated count of an Item is added to the database.
    const addCountUpdate = () => {
        const itemId = details._id

        axiosPrivate.patch('/newItems', { itemId, itemCount, sellingPriceOfTotal })
            .then((response) => console.log(response))
            .catch((err) => console.log(err))

        setSeverity("success")
        setMessage(`Updated Successfully to ${itemCount}`)
        setOpen(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <>
            <div className='stockItem_wrapper'>
                <div className='a_stockItem_wrapper'>
                    <div className='item_img_container'></div>
                    <div ><div className='stk_name'>{productName.charAt(0).toUpperCase() + productName.slice(1)}</div>
                        <div>
                            <div className='stk_value'>NGN {sellingPrice.toLocaleString()}</div>
                            {showStockCount && <div className='stk_count'>Count: {itemCount}</div>}
                            {showPlusMinus && <><div className='increment_decrement'>
                                <FontAwesomeIcon className='plus_icon' icon={faPlus} onClick={itemIncrement} />
                                {itemCount}
                                <FontAwesomeIcon icon={faMinus} onClick={itemDecrement} /></div>
                                <button className='add_Btn' onClick={addCountUpdate}>+ add</button>
                                <button className='cancel_Btn' onClick={showStockCountBtn}>x cancel</button>
                            </>}

                        </div>
                    </div>
                </div>


                <div className='addEditButtonsCheckbox_wrapper'>

                    {showCheckBox && <input type='checkbox' value={details._id} checked={details.isChecked} onChange={(e) => handlecheckbox(e)} />}
                    <div className='addStk_Font_wrapper'>
                        <button className='add_stock_btn' onClick={showStockUpdateBtn}>Add Stock</button>
                        <Link to={`/editInventory/${details._id}`}> <FontAwesomeIcon className='edit-btn-fa' icon={faPenClip} cursor='pointer' /></Link>
                    </div>
                    <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />

                </div>
            </div>
        </>
    )
}

export default StockItemList