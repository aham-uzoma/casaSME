import React from 'react'
import './AddServiceComp.css'

/**
 * This is the Add Service Component and it shows up in the inventory Page
 * when the service button is clicked after the add new product button is clicked.
 * This component does not perform any function in this version 1 release of the casa app.
 */

const AddServiceComp = () => {
  return (
    <div className='service_form_button_div'>
      <form id='serviceDetailsForm' className='serviceDetailsForm'>
        <input id='name_of_service' type='Text' className='name_of_service' placeholder='Service Name' />
        <input id='service_charge' type='Number' className='service_charge' placeholder='Service Charge' />

        <select id='selectUnits' value='select Unit  Measurement' className='selectUnits' name='selectUnits'>
          <option>Select Unit Measurement</option>
          <option>grams</option>
          <option>kg</option>
          <option>km</option>
          <option>portion</option>
          <option>cm</option>
          <option>Bag</option>
        </select>

      </form>
      <button key="key" className='saveServices_Btn' >Save</button>

    </div>
  )
}

export default AddServiceComp