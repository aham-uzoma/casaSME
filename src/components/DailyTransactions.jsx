import React from 'react'

/**
 * This component is no longer being used anywhere in the app, 
 * it was left for educational/reference purpose
 */

const DailyTransactions = () => {
  return (
    <>
      <div className='dailyMoney'>
        <div className='todayInOut'>
          <div>TODAY
            <p>$56,000</p>
          </div>
          <div>OUT
            <p>$6,000</p>
          </div>
          <div >
            <div className='in'>IN</div>
            <p>$62,000</p>
          </div>
        </div>

      </div>


    </>
  )
}

export default DailyTransactions