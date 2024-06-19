import React from 'react'
import './CustomerNameEntry.css'

/**
 * Handels customer details entry and display that exists in the moneyOut component
 */

const CustomerNameEntry = ({ setShowCustomerNameEntryComp,
    setShowAddCustomerComp,
    setCustomerName,
    setCustomerContact,
    customerName,
    customerContact,
    setShowCustomerDetails }) => {

    const setVisibleInvisibleButtons = () => {
        setShowCustomerNameEntryComp(false)
        setShowAddCustomerComp(true)
        setCustomerDataVisibility()
    }

    const setCustomerDataVisibility = () => {
        if (customerName === '' || customerContact === 0) {
            setShowCustomerDetails(false)
        } else {
            setShowCustomerDetails(true)
        }
    }

    return (
        <>

            <div className='customerNameSection'>
                <div>
                    <h3>CUSTOMER NAME</h3>
                </div>

                <div>
                    <form id='customersName'>
                        <input type='text' className='customersName'
                            placeholder='e.g. Mr John' onChange={(e) => { setCustomerName(e.target.value) }} />
                    </form>
                </div>
                <div>
                    <h3>CUSTOMER CONTACT</h3>
                </div>

                <div>
                    <form id='customersContact'>
                        <input type='number' className='customersContact'
                            placeholder='e.g. 0810...' onChange={(e) => { setCustomerContact(e.target.value) }} />
                    </form>
                </div>
                <hr className='borderline2' />
                <div className='saveCustomersBtnDiv'><button className='saveCustomersBtn' onClick={() => setVisibleInvisibleButtons()}>+ Add</button></div>
            </div>
        </>
    )
}



export default CustomerNameEntry