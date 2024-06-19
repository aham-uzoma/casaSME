import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Axios from "../api/axios";

/**
 * This component is no longer being used anywhere in the app, 
 * it was left for educational/reference purpose
 */

const MoneyInOutDetails = () => {

    const [moneyInTransactions, setMoneyInTransactions] = useState([])

    useEffect(() => {
        Axios.get('/newItems').then((response) => {
            setMoneyInTransactions(response.data)
        })
    }, [])

    return (
        <div className='moneyInOutWrapper'>
            {moneyInTransactions.map((item) => {
                return (
                    <>
                        <div>{item.productName}</div>
                        <div className='amountAndIcons'>
                            <div className='amountInOut'>${item.sellingPrice}</div>
                            <div className='deleteEditIcons'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>
                    </>
                )
            })
            }
        </div>

    )
}

export default MoneyInOutDetails