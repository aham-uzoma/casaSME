import React, { useEffect, useState } from 'react'

/**
 * This component shows up current dates in the moneyIn and moneyOut sections of the app.
 */

const CurrentDates = () => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [])


  return (

    <div className='custom-date'>{date.toDateString()}</div>

  )
}

export default CurrentDates