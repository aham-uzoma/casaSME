import React from 'react'
import './AddCustomer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

/**
 * Add Customer Component, collects data on a customer, sets this component visible or invisible
 */

const AddCustomer = ({ makeAddCustomerRequired,
    setShowAddCustomerComp,
    setShowCustomerNameEntryComp,
    customerName,
    customerContact,
    showCustomerDetails,
    setCustomerContact,
    setCustomerName,
    balanceDue }) => {

    const customerDetailsOnclick = () => {
        setShowCustomerNameEntryComp(true)
        setShowAddCustomerComp(false)
    }

    const deleteSupplierdisplay = () => {
        const element = document.getElementById('customerNameContactDisplay')
        element.remove()
        setCustomerContact(0)
        setCustomerName('')
    }


    return (
        <div>
            <div
                className='addCustomerdiv'>
                {makeAddCustomerRequired()}
                <button className='customerDetailsBtn' onClick={customerDetailsOnclick}>Enter Customer Details</button>
            </div>

            {showCustomerDetails && <div className='customerNameContactDisplay' id='customerNameContactDisplay'><div className='name_Contact'>{customerName}<div>{customerContact}<div className='deptAmount'>Debt Amount - {balanceDue}</div>
            </div></div><div className='trashcan'><FontAwesomeIcon icon={faTrashCan} onClick={deleteSupplierdisplay} /></div></div>}
        </div>
    )
}

export default AddCustomer