import React from 'react'
import Balances from './components/Balances'
import DailyTransactions from './components/DailyTransactions'
import MoneyInOutDetails from './components/MoneyInOutDetails'

/**
 * This Component and other components within it <Balances>, <DailyTransactions>, 
 * <MoneyInOutDetails> is not in use across the application
 * It was modified with HomeLayOutt Component, but the component 
 * was still leftOut for reference purposes.
 * 
 */

const HomeLayOut = () => {
  
  return (
    <>
    <div className='allBodyCards'>
   <Balances />
   <div className='transactions'>
   <DailyTransactions/>
   <MoneyInOutDetails />
   </div>
   </div>
   
   </>
  )
}

export default HomeLayOut