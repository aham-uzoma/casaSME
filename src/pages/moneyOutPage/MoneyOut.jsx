import React, { useEffect, useRef, useState } from 'react'
import './MoneyOut.css'
import ItemLists from '../../components/ItemLists/ItemLists'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import AddSupliers from '../../components/AddSuppliers/AddSupliers'
import SupplierNameCompont from '../../components/SupplierNameCompont/SupplierNameCompont'
import FlashMessages from '../../components/FlashMessages'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'

/**
 * This component handles all Money Out/Daily Debit
 * transaction entry and calculations.
 * 
 */

const MoneyOut = () => {
    const [visible, setVisible] = useState(false)
    const [totalAmtOut, setTotalAmtOut] = useState(0)
    const [amtPaid, setAmtPaid] = useState(0)
    const [dueBalance, setDueBalance] = useState(0)
    const [product_service, setProduct_service] = useState('')
    const [cost_price, setCost_Price] = useState(0)
    const [unitsOfItem, setUnitsOfItem] = useState('')
    const [item_quantity, setItemQuantity] = useState(1)
    const [description, setDescription] = useState('')
    const [serviceCategory, setserviceCategory] = useState('')
    const [newMoneyOutItem, setNewMoneyOutItem] = useState([])
    const [newMoneyOutData, setNewMoneyOutData] = useState([])
    const [totalCostPriceCount, setTotalCostPriceCount] = useState(0)
    const [totalCostPrice, setTotalCostPrice] = useState(0)

    const [severity, setSeverity] = useState("")
    const [themessage, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const [supplierName, setSupplierName] = useState('')
    const [supplierContact, setSupplierContact] = useState(0)
    const [showSupplierComponent, setShowSupplierComponent] = useState(false)
    const [showAddSupliersComp, setShowAddSupliersComp] = useState(true)
    const [showSupplierDetails, setshowSupplierDetails] = useState(false)

    const [showTotalCostPrice, setShowTotalCostPrice] = useState(true)
    const [showTotalAmtOut, setShowTotalAmtOut] = useState(false)

    const refContainer = useRef()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const goToMoneyIn = () => navigate('/moneyIn')

    //handles data input
    const handleTotalAmtOut = (e) => {
        setTotalAmtOut(e.target.value)
        setShowTotalAmtOut(true)
        setShowTotalCostPrice(false)
    }

    const handleAmtPaid = (e) => {
        setAmtPaid(e.target.value)
        changesInDueBalance()

    }
    const handleProductServiceName = (e) => {
        setProduct_service(e.target.value)
        setShowTotalAmtOut(false)
        setShowTotalCostPrice(true)
    }
    const handleCost_Price = (e) => {
        setCost_Price(e.target.value)
    }
    const handleUnitsOfItem = (e) => {
        setUnitsOfItem(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleServiceCategory = (e) => {
        setserviceCategory(e.target.value)
    }

    const changesInDueBalance = () => {
        return amtPaid === "" || amtPaid === 0 ? null : setDueBalance(totalAmtOut - amtPaid)
    }

    //Quantity count increment
    const quantityIncrement = () => {
        setItemQuantity(item_quantity + 1)
    }
    //Quantity count decrement
    const quantityDecrement = () => {
        setItemQuantity(item_quantity - 1)
    }

    //coalate all data for one product or service and save to state
    const saveMoneyOutItem = () => {
        const newMoneyOutObj = { product_service, cost_price, unitsOfItem, totalCostPriceCount, item_quantity }
        setNewMoneyOutItem([...newMoneyOutItem, newMoneyOutObj])
    }

    useEffect(() => {
        const totalCostPrice1 = newMoneyOutItem.reduce((total, item) => total + item.totalCostPriceCount, 0)
        setTotalCostPrice(totalCostPrice1)
    }, [newMoneyOutItem, totalCostPrice])

    //calculates total cost price of one item selected multiple times
    useEffect(() => {
        if (item_quantity === 0) return;
        let interval = setTotalCostPriceCount(item_quantity * cost_price)
        return () => {
            // setInterval cleared when component unmounts
            clearInterval(interval);
        }
    }, [item_quantity, cost_price]);

    //automatically displays the calculated totalAmount
    //and displays it in the totalAmtForm
    useEffect(() => {
        if (totalAmtOut === 0) {
            // setups:
            document.addEventListener('click', handleTotalAmtOut)
            // cleanups:
            return () => {
                document.removeEventListener('click', handleTotalAmtOut)
            };
        } else if (showTotalAmtOut === false) {
            refContainer.current.value = totalCostPrice
            setTotalAmtOut(document.getElementById("totalAmtForm").value)
        }

    }, [amtPaid, totalAmtOut, dueBalance, totalCostPrice, showTotalAmtOut])


    useEffect(() => {

        if (totalAmtOut === 0) {
            document.getElementById("totalAmtForm").placeholder = "Total Amount"
            console.log(totalAmtOut)
        }
        else if (showTotalAmtOut === false) {
        }

    }, [totalCostPrice, totalAmtOut, showTotalAmtOut, product_service]);

    //set the value of dueBalance to state
    useEffect(() => {
        setDueBalance(totalAmtOut - amtPaid)

    }, [amtPaid, totalAmtOut])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)

    }
    const saveItemsFormValidation = (e) => {
        if (product_service === ' ' || cost_price === 0) {
            setSeverity("error")
            setMessage("product or service name and cost price cannot be empty");
            setOpen(true)
        } else {
            saveMoneyOutItem()
            setVisible(!visible)
            setCost_Price(0)
            setProduct_service('')
            setItemQuantity(1)
            setUnitsOfItem('')
        }
    }
    //validate and save MoneyOut-Debit transaction to db 
    //and reset forms 
    const saveAllMoneyOutData = (e) => {
        const newMoneyOutObj2 = {
            totalAmtOut,
            amtPaid,
            dueBalance,
            description,
            serviceCategory,
            supplierName,
            supplierContact,
            newMoneyOutItem
        }
        setNewMoneyOutData([...newMoneyOutData, newMoneyOutObj2])

        e.preventDefault()

        if (totalAmtOut === 0) {
            setSeverity("error")
            setMessage("Enter Total Amount")
            setOpen(true)
        } else if (amtPaid === 0) {
            setSeverity("error")
            setMessage("Enter Amount Paid")
            setOpen(true)
        } else if (supplierName === "" || supplierContact === "") {
            setSeverity("error")
            setMessage("Enter supplier's Name and Contact")
            setOpen(true)
        } else {

            const postMoneyOutTo_db = async () => {

                await axiosPrivate.post('/moneyOut', {
                    totalAmtOut, amtPaid, dueBalance, description, serviceCategory,
                    supplierName, supplierContact, newMoneyOutItem
                })
                    .then((res) => { alert('New MoneyOut Transaction Created') })
                    .catch((error) => { console.log(error) })
            }
            postMoneyOutTo_db()

            document.getElementById("totalAndRecievedAmnt").reset();
            document.getElementById("itemsDescriptionFrm").reset();
            document.getElementById("selectCategory").reset();
            setTotalAmtOut(0)
            setAmtPaid(0)
            setDueBalance(0)
            setDescription('')
            setserviceCategory('')
            setSupplierName('')
            setSupplierContact(0)
            setNewMoneyOutItem([])
            setSeverity("success");
            setMessage("Saved Successfully !!!");
        }
    }

    return (
        <>
            <div className='moneyOutDiv'>
                <div className='blackSurface'><h1>Money Out: <span>_Debit.</span></h1>
                    <div className='moneyInOutLink'><p onClick={goToMoneyIn}>MoneyIn</p></div>
                </div>
                <div className='moneyOutWrapper'>
                    <div className='amountsFormContainer'>
                        <div className='moneysAndDate'>
                            <h3>Enter Money Out</h3>
                            <div className='debit'>(Debit)</div>
                            <div><h4>
                            </h4></div>
                        </div>
                        <div className='enterAmountsWrapper'>
                            <div>
                                <form id='totalAndRecievedAmnt' className='totalAndRecievedAmnt'>
                                    <input type='number' ref={refContainer} id='totalAmtForm' className='totalAmtForm' placeholder='Total Amount' onChange={handleTotalAmtOut} />
                                    <input type='number' id='amtRecievedform' className='amtRecievedform' placeholder='Amount Paid' onChange={handleAmtPaid} />
                                </form>
                            </div>

                            <div className='balanceDueContainr'>
                                <h3>Balance Due:</h3>
                                <div><h4>{dueBalance}</h4></div>
                            </div>
                        </div>
                        <hr className='borderline1' />
                        <div className='addItemButtondiv'>
                            <button className='addItemButton' onClick={() => { setVisible(!visible) }} >+ Add Item (Optional)</button>
                        </div>
                    </div>
                    <div>


                        {visible && <div className='addItemsContainr'>
                            <div className='addItemXContainr'><div>Add Items</div><div className='xclose' onClick={() => { setVisible(!visible) }}>X</div></div>
                            <div className='product_service_txt'>Product/Service</div>
                            <div>
                                <form id='addItemsFrms' className='addItemsFrms'>
                                    <input id='prodtName' type='text' className='prodtName' placeholder='product or service name'
                                        onChange={handleProductServiceName} />
                                    <input id='costPrice' type='number' className='costPrice' placeholder='cost price'
                                        onChange={handleCost_Price} />
                                    <select id='unit' value={unitsOfItem} className='selectUnitt' name='unit'
                                        onChange={handleUnitsOfItem}>
                                        <option>Select Unit Measurement</option>
                                        <option>grams</option>
                                        <option>kg</option>
                                        <option>km</option>
                                        <option>portion</option>
                                        <option>cm</option>
                                        <option>Bag</option>
                                    </select>
                                    <div className='quantityContainer'>
                                        <div>Quantity:</div>
                                        <div className='itemCountr'>
                                            <FontAwesomeIcon className='increamentDecrement' icon={faPlus} onClick={quantityIncrement} />
                                            {item_quantity}
                                            <FontAwesomeIcon icon={faMinus} onClick={quantityDecrement} /></div>
                                    </div>
                                </form>
                            </div>
                            <div className='itemSaveBtndiv'><button key="key" className='itemSaveBttn' onClick={(e) => saveItemsFormValidation(e)}>Save</button></div>
                        </div>}
                        {!visible && <ItemLists
                            product_service={product_service}
                            cost_price={cost_price}
                            item_quantity={item_quantity}
                            newMoneyOutItem={newMoneyOutItem}
                            totalAmtOut={totalAmtOut}
                            showTotalCostPrice={showTotalCostPrice}
                            showTotalAmtOut={showTotalAmtOut}
                            setShowTotalCostPrice={setShowTotalCostPrice}
                            setShowTotalAmtOut={setShowTotalAmtOut}
                            setNewMoneyOutItem={setNewMoneyOutItem}
                            totalCostPriceCount={totalCostPriceCount}
                            setTotalCostPriceCount={setTotalCostPriceCount} />}
                        <div className='descriCate'>
                            <div>
                                <h3>DESCRIPTION</h3>
                            </div>

                            <div>
                                <form id='itemsDescriptionFrm'>
                                    <input type='text' className='itemsDescriptionFrm'
                                        placeholder='e.g. white T-Shirts' onChange={handleDescription} />
                                </form>
                            </div>

                            <div>
                                <h3>CATEGORY</h3>
                            </div>

                            <div>
                                <form id='selectCategory' className='selectCategory'>
                                    <select id='unit' value={serviceCategory} className='select_a_Category' name='unit'
                                        onChange={handleServiceCategory}>
                                        <option>Select Category</option>
                                        <option>Food</option>
                                        <option>Advertisment</option>
                                        <option>Transportation</option>
                                        <option>Software</option>
                                        <option>Entertainment</option>
                                        <option>Taxes</option>
                                    </select>
                                </form>
                            </div>

                        </div>
                        {showAddSupliersComp && <AddSupliers setShowSupplierComponent={setShowSupplierComponent}
                            setShowAddSupliersComp={setShowAddSupliersComp}
                            supplierName={supplierName}
                            supplierContact={supplierContact}
                            showSupplierDetails={showSupplierDetails}
                            setshowSupplierDetails={setshowSupplierDetails} />}
                        {showSupplierComponent && <SupplierNameCompont setSupplierName={setSupplierName}
                            setSupplierContact={setSupplierContact}
                            setShowSupplierComponent={setShowSupplierComponent}
                            setShowAddSupliersComp={setShowAddSupliersComp}
                            supplierName={supplierName}
                            supplierContact={supplierContact}
                            showSupplierDetails={showSupplierDetails}
                            setshowSupplierDetails={setshowSupplierDetails} />}
                        <div className='saveMoneyOutDetailsdiv'>
                            <button className='saveMoneyOutDetailsBtn' onClick={saveAllMoneyOutData}>Save</button></div>
                    </div>
                    {/* displays red or green FlashMessages  */}
                    <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />

                </div>

            </div>

        </>
    )
}

export default MoneyOut