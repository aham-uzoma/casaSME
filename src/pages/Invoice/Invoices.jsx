import React, { useEffect, useState } from 'react'
import './invoices.css'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FlashMessages from '../../components/FlashMessages'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component handles the process of creating a newInvoice
 * 
 */

const Invoices = () => {
    const [showCustomerForm, setShowCustomerForm] = useState(true)
    const [showItemForm, setShowItemForm] = useState(false)
    const [severity, setSeverity] = useState("");
    const [themessage, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [invoiceDate, setInvoiceDate] = useState(new Date().toLocaleDateString('fr-FR'))
    const [invoiceDueDate, setinvoiceDueDate] = useState(dayjs())
    const [newInvoiceItemm, setNewInvoiceItemm] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState(0)
    const [customerAddress, setCustomerAddress] = useState('')
    const [customerState, setCustomerState] = useState('')
    const [productName, setProductName] = useState('')
    const [vaTaxPercent, setVaTaxPercent] = useState(0)
    const [vaTaxValue, setvaTaxValue] = useState(0)
    const [sellingPrice, setSellingPrice] = useState(0)
    const [unitOfMeasurement, setUnitOfMeasurement] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [totalPriceCount, setTotalPriceCount] = useState(0)
    const [vatTotal, setVatTotal] = useState(0)
    const [netTotal, setNetTotal] = useState(0)
    const [newCustomerData, setNewCustomerData] = useState([])

    const [showCustomerData, setShowCustomerData] = useState(false)

    const [currentCustomer, setCurrentCustomer] = useState({})

    const axiosPrivate = useAxiosPrivate()


    //handle user form input
    const handleEnterCustomerName = (e) => {
        setCustomerName(e.target.value)
        setShowCustomerData(false)
    }
    const handleEnterPhoneNumber = (e) => {
        setCustomerPhoneNumber(e.target.value)
        setShowCustomerData(false)

    }

    const handleEnterAddress = (e) => {
        setCustomerAddress(e.target.value)
        setShowCustomerData(false)

    }

    const handleEnterState = (e) => {
        setCustomerState(e.target.value)
        setShowCustomerData(false)

    }

    const handleEnterProductName = (e) => {
        setProductName(e.target.value)
    }

    const handleEnterSellingPrice = (e) => {
        setSellingPrice(e.target.value)
    }

    const handleEnterVAT = (e) => {
        setVaTaxPercent(e.target.value)
    }

    const handleUnitOfMeasurement = (e) => {
        setUnitOfMeasurement(e.target.value)
    }
    const quantityIncrement = () => {
        setQuantity(quantity + 1)
    }
    const quantityDecrement = () => {
        setQuantity(quantity - 1)
    }

    const handleShowCustomerForm = () => {
        setShowCustomerForm(true)
        setShowItemForm(false)
    }
    const handleShowItemForm = () => {
        setShowCustomerForm(false)
        setShowItemForm(true)
    }

    //cancel-close flash message
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)

    }

    //validate and save customer details to state
    const addCustomerDetails = (e) => {
        e.preventDefault()
        if (customerName === '') {
            setSeverity("error")
            setMessage("Please Enter Customer's Name");
            setOpen(true)
        } else if (customerPhoneNumber === 0) {
            setSeverity("error")
            setMessage("Please Enter Customer's Phone Number");
            setOpen(true)
        } else if (customerAddress === '') {
            setSeverity("error")
            setMessage("Please Enter Customer's Address");
            setOpen(true)
        } else if (customerState === '') {
            setSeverity("error")
            setMessage("Please Enter Customer's State");
            setOpen(true)
        } else {

            const customersObj = { customerName, customerPhoneNumber, customerAddress, customerState }
            setNewCustomerData([...newCustomerData, customersObj])
            setShowCustomerData(true)
            setCurrentCustomer(customersObj)
            handleResetCustomerForms()

        }
    }

    //validate and save newInvoice Item details to state
    const addNewInvoiceItem = (e) => {
        e.preventDefault()
        if (productName === '') {
            setSeverity("error")
            setMessage("Please Enter Product Name");
            setOpen(true)
        } else if (sellingPrice === 0) {
            setSeverity("error")
            setMessage("Please Enter selling price");
            setOpen(true)
        } else if (vaTaxPercent === 0) {
            setSeverity("error")
            setMessage("Please Enter VAT");
            setOpen(true)
        } else if (unitOfMeasurement === '') {
            setSeverity("error")
            setMessage("Please Select Unit of Measurement");
            setOpen(true)
        } else {
            const newInvoiceObj = { productName, sellingPrice, vaTaxPercent, vaTaxValue, totalPriceCount, unitOfMeasurement, quantity }
            setNewInvoiceItemm([...newInvoiceItemm, newInvoiceObj])
            handleResetItemsForms()
        }
    }

    //reset forms upon submission
    const handleResetCustomerForms = () => {
        document.getElementById("addCustomerForms").reset()
        setCustomerName('')
        setCustomerPhoneNumber(0)
        setCustomerAddress('')
        setCustomerState('')
    }
    const handleResetItemsForms = () => {
        document.getElementById("itemDetailsFormm").reset()
        setProductName('')
        setVaTaxPercent(0)
        setvaTaxValue(0)
        setSellingPrice(0)
        setUnitOfMeasurement('')
        setQuantity(1)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setInvoiceDate(new Date())
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [])



    useEffect(() => {
        if (quantity === 0) return
        let interval = setTotalPriceCount(sellingPrice * quantity)
        return () => {
            // setInterval cleared when component unmounts
            clearInterval(interval);
        }

    }, [sellingPrice, quantity]);

    useEffect(() => {
        let interval = setvaTaxValue(vaTaxPercent / 100 * totalPriceCount)
        console.log(totalPriceCount);
        return () => {
            // setInterval cleared when component unmounts
            clearInterval(interval);
        }

    }, [vaTaxPercent, totalPriceCount]);


    useEffect(() => {
        const netTotalValue = newInvoiceItemm.reduce((total, item) => total + item.totalPriceCount, 0)
        setNetTotal(netTotalValue)
        const vatTotalValue = newInvoiceItemm.reduce((total, item) => total + item.vaTaxValue, 0)
        setVatTotal(vatTotalValue)
    }, [newInvoiceItemm])

    const deleteItems = (itemsList) => {
        const newInvoiceItemsArr = newInvoiceItemm.filter((items) => items !== itemsList)
        setNewInvoiceItemm(newInvoiceItemsArr)
    }

    //save invoice data to db
    const saveInvoiceDates = (e) => {
        e.preventDefault()
        const dayjsValue = dayjs()
        const invoiceDueDateValue = invoiceDueDate.format('DD MMMM YYYY')
        if (invoiceDueDateValue === dayjsValue.format('DD MMMM YYYY')) {
            setSeverity("error")
            setMessage("Please Select Invoice Due Date");
            setOpen(true)
        } else if (showCustomerData === false) {
            setSeverity("error")
            setMessage("Please Enter Customer Details");
            setOpen(true)
        } else if (!Array.isArray(newInvoiceItemm) && !newInvoiceItemm.length) {
            setSeverity("error")
            setMessage("Please Enter Invoice Items");
            setOpen(true)
        } else {
            axiosPrivate.post('/newInvoice', {
                invoiceDate, invoiceDueDate, newInvoiceItemm, currentCustomer
            }).then((response) => { //alert('TRANSACTION CREATED')
                window.location.reload(true)
                setSeverity("success");
                setMessage("Saved Successfully !!!");
                setOpen(true);
            }).catch(function (error) {
                console.log(error);
                setSeverity("error")
                setMessage("Transaction Failed");
                setOpen(true)
            });
        }
    }

    return (
        <div>
            <div className='blackSurfacee'><h1>Invoice.</h1></div>
            <div className='newInvoice_background'>
                <div className='invoice_wrapper'>
                    <div className='invoicesDateContainer'>
                        <div className='invDateSelectionn'>
                            <div className='selectInvDate'>
                                <p>Invoice Date:</p>
                                {new Date(invoiceDate).toDateString()}
                            </div>
                            <div className='selectInvDate'>
                                <p>Due Date:</p>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={invoiceDueDate}
                                        onChange={(newdate) => {
                                            const selectedDate = newdate.format('DD MMMM YYYY')
                                            console.log(selectedDate);
                                            setinvoiceDueDate(newdate);
                                        }} />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>

                    <div className='invoiceData_div'>
                        <h2 className='customer_details'>Customer</h2>

                        {showCustomerData ? <div className='customer_data'>
                            <div><p>Name: <span>{currentCustomer.customerName}</span></p><p>Phone number: <span>{currentCustomer.customerPhoneNumber}</span></p><p>Address: <span>{currentCustomer.customerAddress}</span></p><p>State: <span>{currentCustomer.customerState}</span></p></div>
                            <div></div>
                        </div> : <h>...</h>}
                        <h2 className='item_details'>Items</h2>
                        {newInvoiceItemm.map((items) => {
                            const { productName, quantity, sellingPrice, totalPriceCount, vaTaxValue } = items

                            return (

                                <div className='itemsListt'>
                                    <div className='eachItmAddedd'><div >{productName}</div>
                                        <div >{totalPriceCount} = {sellingPrice} x {quantity}
                                            <div>VAT = {vaTaxValue}</div></div>
                                    </div>
                                    <div key={items.id} className='deleteEditFontss'><FontAwesomeIcon icon={faTrashCan} onClick={() => deleteItems(items)} />
                                    </div>

                                </div>

                            )
                        })}
                        {Array.isArray(newInvoiceItemm) && newInvoiceItemm.length ? (
                            <div id='total_itemss' className='total_itemss'>NetTotal:<div>{netTotal}</div>
                                VAT-Total:<div>{vatTotal}</div></div>) : (<p></p>)
                        }
                        {Array.isArray(newInvoiceItemm) && newInvoiceItemm.length ? (
                            <button className='saveProducts_Btnn' onClick={saveInvoiceDates}>Save</button>) : (<p>...</p>)
                        }
                    </div>

                    <div className='addInvoiceContainer'>
                        <div className='createNewInvoice'><div>Create New Invoice</div></div>
                        <div className='cibtnContainer'><button className='customer_btn' onClick={handleShowCustomerForm}>Customer</button>
                            <button className='item_btn' onClick={handleShowItemForm}>Items</button></div>
                        {showCustomerForm && <div>
                            <form id='addCustomerForms' className='addCustomerForms'>
                                <input id='customerName' name='customerName' type='text' className='customerName' placeholder='Customer or company name'
                                    onChange={handleEnterCustomerName} />
                                <input id='phoneNumber' name='phoneNumber' type='number' className='phoneNumber' placeholder='Phone number'
                                    onChange={handleEnterPhoneNumber} />
                                <input id='address' name='address' className='address' placeholder='Address '
                                    onChange={handleEnterAddress} />
                                <input id='state' name='state' className='state' placeholder='State '
                                    onChange={handleEnterState} />
                            </form>
                            <div className='addCustomerBtnDiv'><button key="key" className='addCustomerBttn' onClick={addCustomerDetails} >+ Add</button></div>
                        </div>}

                        {showItemForm && <form id='itemDetailsFormm' className='itemDetailsFormm'>
                            <input id='productName' type='Text' className='productName' placeholder='Product name'
                                onChange={handleEnterProductName} />
                            <input id='sellingPrice' type='Number' className='sellingPrice' placeholder='Price'
                                onChange={handleEnterSellingPrice} />
                            <input id='vat' type='Number' className='vat' placeholder='VAT in %'
                                onChange={handleEnterVAT} />
                            <select id='selectUnittx' value={unitOfMeasurement} className='selectUnittx' name='selectUnittx'
                                onChange={handleUnitOfMeasurement}>
                                <option>Select Unit Measurement</option>
                                <option>service</option>
                                <option>grams</option>
                                <option>kg</option>
                                <option>km</option>
                                <option>portion</option>
                                <option>cm</option>
                                <option>Bag</option>
                            </select>
                            <div className='quantity'>
                                <div>Quantity:</div>
                                <div className='plus_minus'>
                                    <FontAwesomeIcon className='plus_icon' icon={faPlus}
                                        onClick={quantityIncrement} />
                                    {quantity}
                                    <FontAwesomeIcon className='minus_icon' icon={faMinus}
                                        onClick={quantityDecrement} />
                                </div>
                            </div>
                            <div className='addItemz_Btnn_div'><button key="key" className='addItemz_Btnn' onClick={addNewInvoiceItem}>+ Add</button></div>

                        </form>}

                    </div>
                    <FlashMessages message={themessage} open={open} severity={severity} onClose={handleClose} />
                </div>
            </div>

        </div>
    )
}

export default Invoices