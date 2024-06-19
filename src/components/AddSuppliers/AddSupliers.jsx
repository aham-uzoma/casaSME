import './AddSupliers.css'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * This component is the add Supplies component that shows up when the add supplier button 
 * is clicked in the moneyOut component.
 */

const AddSupliers = ({ setShowSupplierComponent,
    setShowAddSupliersComp,
    supplierName,
    supplierContact,
    showSupplierDetails }) => {

    const supplierDetailsOnclick = () => {
        setShowSupplierComponent(true)
        setShowAddSupliersComp(false)

    }
    const deleteSupplierdisplay = () => {
        const element = document.getElementById('supplierNameContactDisplay')
        element.remove();
    }

    return (
        <div>
            <div className='addSupplierSection'>
                <h3>SUPPLIER</h3>
                <div className='add_Customerdiv'><button className='addSuppliersBtn'
                    onClick={() => supplierDetailsOnclick()}>+ add Supplier</button></div>
            </div>

            {showSupplierDetails && <div className='supplierNameContactDisplay' id='supplierNameContactDisplay'><div className='nameContact'>{supplierName}<div>{supplierContact}
            </div></div><div className='trashcan'><FontAwesomeIcon icon={faTrashCan}
                onClick={() => deleteSupplierdisplay()} /></div></div>}

        </div>
    )
}

export default AddSupliers