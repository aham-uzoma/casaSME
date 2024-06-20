import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MoneyIn.css'
import './MoneyInMoneyOut.css'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect, useRef } from 'react'
import FlashMessages from '../components/FlashMessages';
import CurrentDates from '../components/CurrentDates';
import CustomerNameEntry from '../components/CustomerNameEntryComp/CustomerNameEntry'
import AddCustomer from '../components/AddCustomer/AddCustomer'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'


/**
 * This component handles all Money In/Daily Credit
 * transaction entry and calculations.
 * 
 */

const MoneyIn = () => {

    const [totalAmountIn, setTotalAmountIn] = useState(0);
    const [amountRecieved, setAmountRecieved] = useState(0);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [productName, setProductName] = useState("");
    const [sellingPrice, setSellingPrice] = useState(0);
    const [sellingPriceOfTotal, setSellingPriceOfTotal] = useState(0);
    const [balanceDue, setBalanceDue] = useState(0);
    const [itemDescription, setItemDescription] = useState("");
    const [unitOfQuantity, setUnitOfQuantity] = useState("");
    const [quantityCount, setQuantityCount] = useState(1);
    const [newItems, setNewItems] = useState([]);
    const [moneyInData, setMoneyInData] = useState([]);
    const [modeOfPayment, setModeOfPayment] = useState("");
    const [severity, setSeverity] = useState("");
    const [themessage, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [stockItemsData, setStockItemsData] = useState([])
    const [foundStock, setFoundStock] = useState([])
    const [foundStockQty, setFoundStockQty] = useState(0)

    const [showAddCustomerComp, setShowAddCustomerComp] = useState(true)
    const [showCustomerNameEntryComp, setShowCustomerNameEntryComp] = useState(false)
    const [customerName, setCustomerName] = useState('')
    const [customerContact, setCustomerContact] = useState('')
    const [totalSellingPrice, setTotalSellingPrice] = useState(0)

    const [showCustomerDetails, setShowCustomerDetails] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [showProductItemForm, setShowProductItemForm] = useState(true)
    const [showSuggestedData, setShowSuggestedData] = useState(false)
    const [showTotalAmountIn, setShowTotalAmountIn] = useState(false)
    const [showTotalSellingPrice, setShowTotalSellingPrice] = useState(true)

    const [remainingQuantity, setRemainingQuantity] = useState(0)
    const [selectedQtyNumber, setSelectedQtyNumber] = useState(0)

    const [isBlack, setIsBlack] = useState(true)

    const axiosPrivate = useAxiosPrivate();
    const refContain = useRef()
    const navigate = useNavigate()
    const goToMoneyOut = () => navigate('/moneyOut')

    //handles form input
    const handleTotalAmtInChange = (e) => {
        setTotalAmountIn(e.target.value)
        setShowTotalAmountIn(true)
        setShowTotalSellingPrice(false)
    }
    const handleAmountRecievedChange = (e) => {
        setAmountRecieved(e.target.value);
    }

    const enterSellingPrice = (e) => {
        setSellingPrice(e.target.value);
    }

    const handleItemDescription = (e) => {
        setItemDescription(e.target.value);
    }

    // show and hide some UI components in state
    const handleShowServiceForm = () => {
        setShowServiceForm(true)
        setShowProductItemForm(false)
    }
    const handleShowProductForm = () => {
        setShowServiceForm(false)
        setShowProductItemForm(true)
    }

    //update from inventory search.
    //Handles populating form when data On-typing
    //was found to exist in the database
    const handlePopulateForm2 = (details) => {

        document.getElementById("prodtName").value = details.productName;
        document.getElementById("sellingPrice").value = details.sellingPrice;
        document.getElementById("unit").value = details.unitOfQuantity;
        setProductName(document.getElementById("prodtName").value)
        setSellingPrice(document.getElementById("sellingPrice").value)
        setUnitOfQuantity(document.getElementById("unit").value);
        setShowSuggestedData(false)
        setFoundStockQty(details.quantityCount)

    }

    //Retrieves and sets newItems from the database
    useEffect(() => {
        axiosPrivate.get('/newItems').then((response) => {
            setStockItemsData(response.data)
        }).catch((error) => console.log(error))

    }, [axiosPrivate])

    useEffect(() => {
        if (productName === '' || sellingPrice === 0) {
            setUnitOfQuantity('')
            setFoundStockQty(0)
            setQuantityCount(1)
            setIsBlack(true)
        }
    }, [productName])

    //automatically searches the database as user enters data via forms
    const performSearch = (e) => {
        const searchWord = e.target.value
        setShowTotalAmountIn(false)
        setShowTotalSellingPrice(true)
        if (searchWord !== '') {
            const foundResults = stockItemsData.filter((items) => {
                return items.productName
                    .toLowerCase()
                    .startsWith(searchWord.toLowerCase())
            })
            setFoundStock(foundResults)
            setShowSuggestedData(true)
        } else {
            setShowSuggestedData(false)
        }
        setProductName(searchWord);
    }

    const handleOnclickCloseX = () => {
        setVisible(!visible)
        setProductName('')
        setSellingPrice(0)
        setUnitOfQuantity('')
        setQuantityCount(1)
        setFoundStockQty(0)
        setIsBlack(true)

    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)

    }
    const selectUnitOption = (e) => {
        setUnitOfQuantity(e.target.value);
    }

    const selectModeOfPayment = (e) => {
        setModeOfPayment(e.target.value)
    }

    //setting the selling price of a certain quantity of items to state.
    useEffect(() => {
        if (quantityCount === 0) return; // safeguard invalid value
        let interval = setSellingPriceOfTotal(quantityCount * sellingPrice)
        return () => {
            // setInterval cleared when component unmounts
            clearInterval(interval);
        }

    }, [quantityCount, sellingPrice]);

    //setting the balanceDue value to state
    useEffect(() => {
        if (amountRecieved !== 0) {
            setBalanceDue(totalAmountIn - amountRecieved);
        }
    }, [amountRecieved, totalAmountIn]);

    //actually setting an array of NewItems to State
    let handleSaveItem = () => {
        const newItemData = { productName, sellingPriceOfTotal, quantityCount, unitOfQuantity, sellingPrice, remainingQuantity, selectedQtyNumber };
        setNewItems([...newItems, newItemData]);
        setRemainingQuantity(0)
    }

    //This is to track remaining Item quantity after selection
    useEffect(() => {
        setSelectedQtyNumber(quantityCount)
        if (quantityCount <= foundStockQty && foundStockQty !== 0) {
            setRemainingQuantity(foundStockQty - quantityCount)
        }

    }, [quantityCount, remainingQuantity, foundStockQty]);

    //This tries to show up totalAmountIn in the totalAmtFrm
    useEffect(() => {

        if (totalAmountIn === 0) {
            // setups:
            document.addEventListener('click', handleTotalAmtInChange);
            // cleanups:
            return () => {
                document.removeEventListener('click', handleTotalAmtInChange);
            };
        } else if (showTotalAmountIn === false) {
            refContain.current.value = totalSellingPrice
            setTotalAmountIn(document.getElementById("totalAmtFrm").value)
        }

    }, [totalAmountIn, totalSellingPrice, showTotalAmountIn]);

    let handleSaveMonyIn = (event) => {
        event.preventDefault();
        if (totalAmountIn === 0 || itemDescription === "") {
            setSeverity("error")
            setMessage("Enter Amount and Item Description");
            setOpen(true)
        } else if (amountRecieved === 0) {
            setSeverity("error")
            setMessage("Enter Amount Recieved");
            setOpen(true)
        } else if (totalSellingPrice > totalAmountIn) {
            setSeverity("error")
            setMessage("Total Selling Prices cannot be bigger than Total amount");
            setOpen(true)
        } else if (changeDueBalance() !== null && totalAmountIn - amountRecieved > 0 && !showCustomerDetails) {
            setSeverity("error")
            setMessage("Please Enter Customer Details as Debtor");
            setOpen(true)
        } else {
            const newMoneyInData = { totalAmountIn, amountRecieved, balanceDue, itemDescription, customerName, customerContact, modeOfPayment };
            setMoneyInData([...moneyInData, newMoneyInData]);

            //Save in the database
            const postMoneyInTo_db = async () => {

                await axiosPrivate.post('/moneyIn', {
                    totalAmountIn, amountRecieved, balanceDue, newItems, itemDescription, customerName, customerContact, modeOfPayment
                }).then((response) => { alert('TRANSACTION CREATED') }).catch(function (error) {
                    console.log(error);
                });
            }
            postMoneyInTo_db()
            document.getElementById("totalAndRecievedAmt").reset();
            document.getElementById("itemDescriptionFrm").reset();
            setSeverity("success");
            setMessage("Saved Successfully !!!");
            setOpen(true);
            setTotalAmountIn(0);
            setAmountRecieved(0);
            setBalanceDue(0);
            setItemDescription('');
            setNewItems([]);
            setShowCustomerDetails(false)
        }
    }
    const handleDelete = (itemsLists) => {
        const newItemListData = newItems.filter((items) => items !== itemsLists);
        setNewItems(newItemListData);
    }

    //saves a new collection of Items to state
    let handleSaveItemOnclick = () => {
        if (sellingPrice === 0 || productName === "") {
            setSeverity("error")
            setMessage("Product name and Selling price cannot be empty");
            setOpen(true)
        } else if (quantityCount > foundStockQty && foundStockQty !== 0) {
            setSeverity("error")
            setMessage(`Please reduce Quantity to any number below or equal to ${foundStockQty}`);
            setOpen(true)
        } else {
            handleSaveItem()
            setVisible(!visible)
            document.getElementById("addItemsFrms").reset();
            setQuantityCount(1);
            setFoundStockQty(0);
            setUnitOfQuantity("")
            setIsBlack(true)
        }
    }

    let incrementQuantity = () => {

        setQuantityCount(quantityCount + 1)
        if (quantityCount === foundStockQty) {
            setQuantityCount(foundStockQty)
            setIsBlack(false)
        } else

            if (foundStockQty === 0)
                setQuantityCount(quantityCount + 1)

    }
    let decrementQuantity = () => {
        setQuantityCount(quantityCount - 1);
        setIsBlack(true)

    }

    let changeDueBalance = () => {

        return amountRecieved === "" || amountRecieved === 0 ? null : totalAmountIn - amountRecieved;

    }

    let makeAddCustomerRequired = () => {
        if (changeDueBalance() !== null && totalAmountIn - amountRecieved > 0) {
            return <h3><div className='addCustomerRequired'>Add Customer<div className='requiredTag'>(required)</div></div></h3>
            // a condition that the user must click a button.
        } else {
            return <h3>Add Customer(optional)</h3>

        }
    }

    let setOnclick = () => { //set the UI element hide and Unhide once
        setVisible2(!visible2);
    }
    let onClickOnce = (e) => {//set the UI element hide and Unhide once.
        if (!clicked) {
            setClicked(true);
            setOnclick(e);
        }
    }

    useEffect(() => {
        const totalSellingPrice1 = newItems.reduce((total, item) => total + parseFloat(item.sellingPriceOfTotal), 0);
        setTotalSellingPrice(totalSellingPrice1)
    }, [newItems]);

    const displayAddedItemList = () => {
        if (!visible) {

            return (
                <div>
                    <div className='items_txt'>ITEMS</div>
                    {newItems.map((items) => {
                        const { productName, sellingPriceOfTotal, quantityCount, sellingPrice } = items;
                        return (
                            <>
                                <div className='itemsAdded' key="key0">
                                    <div key="key1" className='eachItemAdded'><div>{productName}</div>
                                        <div key="key2">{sellingPriceOfTotal} = {sellingPrice} x {quantityCount}</div>
                                    </div>
                                    <div className='deleteEditFont' key="key3"><FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(items)} /></div>

                                </div>

                            </>
                        );
                    })}
                    <div className='totalItemsAdded'>
                        <p>Total</p>
                        {showTotalSellingPrice && <p>${totalSellingPrice}</p>}
                        {showTotalAmountIn && <p>${totalAmountIn}</p>}
                    </div>
                </div>
            );
        }
    }



    return (
        <div className='moneyInRoute'>
            <div className='blackSurface'><h1>Money In: <span>_Credit.</span></h1>
                <div className='moneyInOutLink'><p onClick={goToMoneyOut}>MoneyOut</p></div>
            </div>
            <div className='moneyInPage'>
                <div className='amountsFormContainer'>
                    <div className='dateMoneyTab'>
                        <div>
                            <h3 className='enterMoneyTxt'>Enter Money In</h3>
                            <div className='credit'>(Credit)</div>
                        </div>
                        <div><h4>{
                            <CurrentDates />
                        }</h4></div>
                    </div>
                    <div className='enterAmountWrapper'>
                        <div>
                            <form id='totalAndRecievedAmt' className='totalAndRecievedAmt'>
                                <input type='number' ref={refContain} id='totalAmtFrm' className='totalAmtFrm' placeholder='Total Amount' onChange={handleTotalAmtInChange} />
                                <input type='number' id='amtRecievedfrm' className='amtRecievedfrm' placeholder='Amount Recieved' onChange={handleAmountRecievedChange} />
                            </form>
                        </div>

                        <div className='balanceDueContainer'>
                            <h3>Balance Due</h3>
                            <div><h4>{changeDueBalance()}</h4></div>
                        </div>

                        <hr className='borderline1' />
                        <div className='addItemdiv'><input type="submit" className='addItem'
                            value="Add Item (Optional)" onClick={() => setVisible(!visible)} /></div>
                    </div>
                </div>
                <div>
                    <div>
                        {displayAddedItemList()}
                    </div>

                    {visible && <div className='addItemsContainr'>
                        <div className='addItemXContainr'><div>Add Items</div><div className='xClose'
                            onClick={handleOnclickCloseX}>X</div></div>
                        <div className='psbtnsContainer'><button className='product_Btnn' onClick={handleShowProductForm}>Product</button>
                            <button className='service_Btnn' onClick={handleShowServiceForm}>Service</button></div>
                        {showProductItemForm && <div>
                            <form id='addItemsFrms' className='addItemsFrms'>
                                <input id='prodtName' name='prodtName' type='text' className='prodt-Name' placeholder='product name' onChange={performSearch} />

                                {showSuggestedData && <div >{foundStock.map((details) => {
                                    const { productName, quantityCount } = details
                                    return quantityCount !== 0 ? (<div key={details.productName} className='suggested_data'
                                        onClick={() => handlePopulateForm2(details)}>
                                        <p>{productName} - {quantityCount} in Stock</p></div>
                                    ) : null
                                })}
                                </div>}

                                <input id='sellingPrice' name='sellingPrice' type='number' className='selling-Price' placeholder='selling price' onChange={enterSellingPrice} />
                                <select id='unit' value={unitOfQuantity} onChange={selectUnitOption} className='select-Unitt' name='unit'>
                                    <option>Select Unit Measurement</option>
                                    <option>grams</option>
                                    <option>kg</option>
                                    <option>km</option>
                                    <option>portion</option>
                                    <option>cm</option>
                                    <option>Bag</option>
                                </select>
                                <div className='quantityContainer'>
                                    <div>Quantity</div>
                                    <div id='itemCounter' type='number' className='itemCounter' name='itemCounter' style={{ color: isBlack ? "black" : "red" }}>
                                        <FontAwesomeIcon icon={faPlus} onClick={incrementQuantity} />
                                        {quantityCount}
                                        <FontAwesomeIcon icon={faMinus} onClick={decrementQuantity} /></div>
                                </div>
                            </form>
                            <div className='itemSaveBtndiv'><button key="key" className='itemSaveBttn' onClick={handleSaveItemOnclick}>Save</button></div>
                        </div>}

                        {showServiceForm && <form id='serviceDetailsFormm' className='serviceDetailsFormm'>
                            <input id='name_of_servicee' type='Text' className='name_of_servicee' placeholder='Service Name' />
                            <input id='service_chargee' type='Number' className='service_chargee' placeholder='Service Charge' />

                            <select id='select-Unitt' value='select Unit  Measurement' className='select-Unitt' name='select-Unitt'>
                                <option>Select Unit Measurement</option>
                                <option>grams</option>
                                <option>kg</option>
                                <option>km</option>
                                <option>portion</option>
                                <option>cm</option>
                                <option>Bag</option>
                            </select>
                            <div className='saveServices_Btnn_div'><button key="key" className='saveServices_Btnn' >Save</button></div>

                        </form>}

                    </div>}

                </div>
                <div className='description'>
                    <div>
                        <h3>DESCRIPTION</h3>
                    </div>
                    <div>
                        <form id='itemDescriptionFrm'>
                            <input type='text' className='itemDescriptionFrm'
                                placeholder='Ex. potatoes' onChange={handleItemDescription} onClick={onClickOnce} />
                        </form>
                    </div>
                </div>
                {visible2 && <div>
                    {showAddCustomerComp && <AddCustomer makeAddCustomerRequired={makeAddCustomerRequired}
                        showAddCustomerComp={showAddCustomerComp}
                        setShowAddCustomerComp={setShowAddCustomerComp}
                        setShowCustomerNameEntryComp={setShowCustomerNameEntryComp}
                        customerContact={customerContact}
                        customerName={customerName}
                        setCustomerName={setCustomerName}
                        setCustomerContact={setCustomerContact}
                        showCustomerDetails={showCustomerDetails}
                        setShowCustomerDetails={setShowCustomerDetails}
                        balanceDue={balanceDue} />}
                    {showCustomerNameEntryComp && <CustomerNameEntry setShowCustomerNameEntryComp={setShowCustomerNameEntryComp}
                        setShowAddCustomerComp={setShowAddCustomerComp}
                        setShowCustomerDetails={setShowCustomerDetails}
                        customerName={customerName}
                        setCustomerName={setCustomerName}
                        customerContact={customerContact}
                        setCustomerContact={setCustomerContact} />}

                    <div className='modeOfPayment'>
                        <div><h3>MODE OF PAYMENT</h3>
                            <div className='radio-inLine'>
                                <input type='radio' onChange={selectModeOfPayment} className='modeOfPayment' name='modeOfPayment' value="BankTransfer" defaultChecked />
                                <label htmlFor="BankTransfer" className="radio">Bank Transfer</label>
                                <input type='radio' onChange={selectModeOfPayment} className='modeOfPayment' name='modeOfPayment' value="Cash" />
                                <label htmlFor="BankTransfer" className="radio" >Cash</label>
                                <input type='radio' onChange={selectModeOfPayment} className='modeOfPayment' name='modeOfPayment' value="POS" />
                                <label htmlFor="BankTransfer" className="radio">POS</label>
                            </div>
                        </div>
                    </div>
                </div>}
                <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />
                <div className='saveMoneyInDetailsdiv'><button className='saveMoneyInDetailsBtn' onClick={handleSaveMonyIn}>Save</button></div>

            </div>
        </div>
    )
}

export default MoneyIn