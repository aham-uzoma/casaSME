import React, { useEffect, useState } from 'react'
import './MoneyInTransactList.css'
import dayjs from 'dayjs';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

/**
 * This component is responsible for displaying all
 * MoneyIn transaction that has happened all through
 * the year.
 * 
 */

const MoneyInTransactList = () => {
    const [moneyInDataByDate, setMoneyInDataByDate] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPrivate = useAxiosPrivate()
    // groups the data by date
    const groupBy = (arr, keyFn) => {
        return arr.reduce((acc, item) => {
            const key = keyFn(item);
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    let groupedData = groupBy(moneyInDataByDate, (data) => dayjs(data.createdAt).format('dddd DD MMMM YYYY'));

    //retrieves and sets the yearly data to state
    useEffect(() => {
        setIsLoading(true)
        axiosPrivate.get('/yearlyMoneyIn/moneyInByYear').then((response) => {
            setMoneyInDataByDate(response.data)
            setIsLoading(false)
        }).catch((e) => {console.log('something went wrong :(', e);setIsLoading(false)});
    }, [])

    return (
        <div className='moneyInRoute'>
            {/* All MoneyIn Page: Credit */}
            <div className='blackSurface'><h1>All Money In: <span>_Credit.</span></h1>
                <div className='moneyInOutLink'><p><a href='/moneyOutTransactList'>All&nbsp;Money&nbsp;Out</a></p></div>
            </div>
            {isLoading ? <p><img src={require('../assets/Spinner.gif')} alt='loading'/></p>:
            <div className='moneyInPage'>
                {Object.entries(groupedData).slice(0).reverse().map(([date, itemz]) => {
                    return (
                        <>
                            <div className="txt_wrapper">
                                <div className="items_txt">{date}</div>
                            </div>
                            {itemz.map((obj) => (
                                <>
                                    {obj.newItems.map((items) => (
                                        <div className='itemsAddedd' key={`${date}-${items.productName}`}>
                                            <div className='eachItemAdded'><div>{items.productName}</div>
                                                <div key="key2">{items.sellingPriceOfTotal} = {items.sellingPrice} x {items.selectedQtyNumber}</div>
                                            </div>
                                        </div>

                                    ))}
                                    <div className='modeOfPay_debtor'>
                                        <p className='payment'>Payment:  {obj.modeOfPayment}</p>
                                        {obj.customerContact || obj.customerName ? (
                                            <>
                                                <p className='debt'>Debtor: {obj.customerName} {obj.customerContact}</p>
                                                <p className='debt'>Debt Amount: {obj.balanceDue}</p>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className='totalItemsAddedd'>
                                        <p>Total</p>
                                        <p>N{Number(obj.totalAmountIn).toLocaleString()}</p>
                                    </div>
                                </>
                            ))}

                        </>
                    )
                })}
            </div>}
        </div>


    )
}

export default MoneyInTransactList