import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import './MoneyOutTransactList.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

/**
 * This component is responsible for displaying all
 * MoneyOut transaction that has happened all through
 * the year.
 * 
 */

const MoneyOutTransactList = () => {
    const [moneyOutDataByDate, setMoneyOutDataByDate] = useState([])

    const axiosPrivate = useAxiosPrivate()

    // group the data by date
    const groupBy = (arr, keyFn) => {
        return arr.reduce((acc, item) => {
            const key = keyFn(item);
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    //retrieving and setting all moneyOut Data by date.
    useEffect(() => {
        axiosPrivate.get('/yearlyMoneyOut/moneyOutByYear').then((response) => {
            setMoneyOutDataByDate(response.data)
            console.log(response.data)
        }).catch((e) => console.log('something went wrong :(', e));
    }, [])

    let groupedData = groupBy(moneyOutDataByDate, (data) => dayjs(data.createdAt).format('dddd DD MMMM YYYY'));

    return (
        <div className='moneyInRoute'>
            <div className='blackSurface'><h1>All Money Out: <span>_Debit.</span></h1>
                <div className='moneyInOutLink'><p><a href='/moneyInTransactList'>All&nbsp;Money&nbsp;In</a></p></div>
            </div>
            {isLoading ? <p><img src={require('../../assets/Spinner.gif')} alt='loading'/></p>:
            <div className='moneyInPage'>
                {Object.entries(groupedData).slice(0).reverse().map(([date, itemz]) => {
                    return (
                        <>
                            <div className="txt_wrapper">
                                <div className="items_txt">{date}</div>
                            </div>
                            {itemz.map((obj) => (
                                <>
                                    {obj.newMoneyOutItem.map((items) => (
                                        <div className='itemsAddedd' key={`${date}-${items.product_service}`}>
                                            <div className='eachItemAdded'><div>{items.product_service}</div>
                                                <div key="key2">{items.totalCostPriceCount} = {items.cost_price} x {items.item_quantity}</div>
                                            </div>
                                        </div>

                                    ))}
                                    <div className='supplier_category'>
                                        <p className='supplier'>supplier:  {obj.supplierName} {obj.supplierContact}</p>
                                        {obj.serviceCategory || obj.description ? (
                                            <>
                                                <p className='service_category'>Category: {obj.serviceCategory}</p>
                                                <p className='service_category'>Description: {obj.description}</p>
                                            </>
                                        ) : null}
                                    </div>
                                    <div className='totalItemsAddedd'>
                                        <p>Total</p>
                                        <p>N{Number(obj.totalAmtOut).toLocaleString()}</p>
                                    </div>
                                </>
                            ))}

                        </>
                    )
                })}
            </div>}
        </div>)
}

export default MoneyOutTransactList