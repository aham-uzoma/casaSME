import './SupplierNameCompont.css'

/**
 * This component handles Supplier details form and supplier Details visibility
 */

const SupplierNameCompont = ({ setSupplierName,
    setSupplierContact,
    setShowSupplierComponent,
    setShowAddSupliersComp,
    supplierName,
    supplierContact,
    setshowSupplierDetails }) => {

    const setVisibleInvisibleButtons = () => {
        setShowSupplierComponent(false)
        setShowAddSupliersComp(true)
        setSupplierDataVisibility()
    }


    const setSupplierDataVisibility = () => {
        if (supplierName === '' || supplierContact === 0) {
            setshowSupplierDetails(false)
        } else {
            setshowSupplierDetails(true)
        }
    }

    return (
        <>

            <div className='supplierNameSection'>
                <div>
                    <h3>SUPPLIER NAME</h3>
                </div>

                <div>
                    <form id='suppliersName'>
                        <input type='text' className='suppliersName'
                            placeholder='e.g. Mr John' onChange={(e) => { setSupplierName(e.target.value) }} />
                    </form>
                </div>
                <div>
                    <h3>SUPPLIER CONTACT</h3>
                </div>

                <div>
                    <form id='suppliersContact'>
                        <input type='number' className='suppliersContact'
                            placeholder='e.g. 0810...' onChange={(e) => { setSupplierContact(e.target.value) }} />
                    </form>
                </div>
                <hr className='borderline1' />
                <div className='saveSuppliersBtnDiv'><button className='saveSuppliersBtn' onClick={() => setVisibleInvisibleButtons()}>+ Add</button></div>
            </div>
        </>
    )
}

export default SupplierNameCompont