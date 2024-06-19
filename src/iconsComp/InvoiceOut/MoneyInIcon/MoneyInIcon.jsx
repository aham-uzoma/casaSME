import React from 'react'
import './MoneyInIcon.css'

const MoneyInIcon = ({ color }) => {
  return (
    <div>
      <svg fill={color} className='moneyInIcon' xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z" /><path d="M23,11h0l-15.777.032a2.018,2.018,0,0,1,.326-.446l3.879-3.879a1,1,0,1,0-1.414-1.414L6.133,9.172a4,4,0,0,0,0,5.656l3.879,3.879a1,1,0,1,0,1.414-1.414L7.547,13.414a2.01,2.01,0,0,1-.291-.382L23,13a1,1,0,0,0,0-2Z" /></svg>
    </div>
  )
}

export default MoneyInIcon