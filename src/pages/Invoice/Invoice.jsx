import React, { useEffect, useState } from 'react'
import './Invoice.css'
import dayjs from 'dayjs'
import PdfIcon from '../../iconsComp/PdfIcon/PdfIcon'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component displays the invoice list
 * It shows all the incoices created by the user 
 * 
 */

const Invoice = () => {

    const [invoiceList, setInvoiceList] = useState([])
    const [loading, setLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        displayInvoiceList()
    }, [])

    //retrieves invoice list from the database and sets it to state
    const displayInvoiceList = () => {
        axiosPrivate.get('/newInvoice').then((response) => {
            setInvoiceList(response.data)
        }).catch((error) => console.log(error))
    }

    const openInvoiceInNewWindow = (id) => {
        setLoading(true)
        try {

            // get the invoice id from the invoice data
            // open the invoice.html file in a new tab with the invoice id as a query parameter
            window.open(`/invoiceData/${id}`, '_blank')

            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    };


    return (
        <>
            <div className='black-Surfacee'><h1>Invoice </h1></div>
            <div className='newInvoice_div'>
                <div className='newInvoice_wrapper'>
                    <h1>New Invoice</h1>
                    <div className='addCustomerInfo'>
                        <div className='custInfo'>
                            <p>Get started, create an invoice</p>
                            <Link to={'/invoices'}>
                                <button >create</button>
                            </Link>
                        </div>
                    </div>
                    <div className='newInvoiceList'>
                        <div className='invoiceList'>Invoice List</div>
                        {invoiceList.slice(-10).reverse().map((invoiceItems => {
                            const { invoiceDate, invoiceDueDate } = invoiceItems

                            return (
                                <div className='newInvoiceData'>
                                    <div className='invoiceIcon'>
                                        <PdfIcon color={'#019901'} />
                                    </div>
                                    <div className='invDates'><div>Invoice Date: {dayjs(invoiceDate).format('DD MMMM YYYY')}</div>
                                        <div>Invoice Due Date: {dayjs(invoiceDueDate).format('DD MMMM YYYY')}</div></div>
                                    <span className='txtColor' onClick={() => openInvoiceInNewWindow(invoiceItems._id)}>View and Share</span>
                                </div>
                            )
                        }))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Invoice