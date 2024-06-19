import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * This component is no longer being used anywhere in the app, 
 * it was left for educational/reference purpose
 */

const Balances = () => {

    const navigate = useNavigate()
    const goToMoneyIn = () => navigate('/moneyIn')
    const goToMoneyOut = () => navigate('/moneyOut')

    const [dueBalance, setDueBalance] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:3500/balanceDue/balanceByDate').then((response) => {
            setDueBalance(response.data);
        }).catch((error) => console.log(error))
    }, [])

    dueBalance.map((item => { return item.balanceDue }))
    const balanceDueArr = dueBalance.map((item => { return item.balanceDue }))
    const totalBalanceDue = balanceDueArr.reduce((total, balance) => total + balance, 0)
    console.log(totalBalanceDue)


    return (
        <div className='wrapper'>
            <div className='card'>
                <div className='balances'><h3>Balances</h3></div>
                <div className='tbmb'>
                    <div className='todayBalance'>
                        Todays Balance
                        <h1>${totalBalanceDue}</h1>
                    </div>
                    <div className='monthsBalance'>
                        The Months Balance
                        <h1>$50,000</h1>
                    </div>
                </div>
                <div className='moneyInOut'>
                    <button className='moneyInButton' onClick={goToMoneyIn}>Money In</button>
                    <button className='moneyOutButton' onClick={goToMoneyOut}>Money Out</button>
                </div>
            </div>

        </div>
    )
}

export default Balances