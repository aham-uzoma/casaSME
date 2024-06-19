import React, { useEffect, useState } from 'react'
import './HomeLayOutt.css'
import { useNavigate } from 'react-router-dom'
import InvoiceOutIcon from '../../iconsComp/InvoiceOut/InvoiceOutIcon'
import InvoiceOpened from '../../iconsComp/InvoiceOut/InvoiceOpened/InvoiceOpened'
import InvoiceDue from '../../iconsComp/InvoiceOut/InvoiceDue/InvoiceDue'
import MoneyInIcon from '../../iconsComp/InvoiceOut/MoneyInIcon/MoneyInIcon'
import MoneyInIcon2 from '../../iconsComp/InvoiceOut/MoneyInIcon/MoneyInIcon2'
import MoneyOutIcon from '../../iconsComp/InvoiceOut/MoneyOutIcon/MoneyOutIcon'
import MoneyOutIcon2 from '../../iconsComp/InvoiceOut/MoneyOutIcon/MoneyOutIcon2'
import BalanceDueIcon from '../../iconsComp/BalanceDueIcon/BalanceDueIcon'
import YourDebtIcon from '../../iconsComp/YourDebtIcon/YourDebtIcon'
import EditIcon from '../../iconsComp/EditIcon/EditIcon'
import DeleteIcon from '../../iconsComp/DeleteIcon/DeleteIcon'
import PrintIcon2 from '../../iconsComp/InvoiceOut/InvoiceDue/PrintIcon2'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

/**
 * This component can be regarded as the Dashboard or the 
 * application's home page. It retrieves all data from the
 * database and displays them in card boxes
 * 
 */

const HomeLayOutt = () => {
  const [itemsList, setItemsList] = useState([])
  const [moneyOutItems, setMoneyOutItems] = useState([])
  const [moneyInByDate, setMoneyInByDate] = useState([])
  const [moneyOutByDate, setMoneyOutByDate] = useState([])
  const [moneyInByMonth, setMoneyInByMonth] = useState([])
  const [moneyOutByMonth, setMoneyOutByMonth] = useState([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [monthlyBalanceDue, setMonthlyBalanceDue] = useState([])
  const [newInvoice, setNewInvoice] = useState([])

  const [totalInvoiceDue, setTotalInvoiceDue] = useState(0)

  const axiosPrivate = useAxiosPrivate();
  const todaysDate = new Date();

  const navigate = useNavigate()
  const goToMoneyIn = () => navigate('/moneyIn')
  const goToMoneyOut = () => navigate('/moneyOut')

  //retrieves all Items(moneyIn and moneyOut items) from the database
  useEffect(() => {
    axiosPrivate.get('/newItemsRow/getNewItemsRow').then((response) => {
      setItemsList(response.data)
    }).catch((e) => console.log('something went wrong :(', e));

  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/monthlyMoneyIn/moneyInByMonth').then((response) => {
      setMoneyInByMonth(response.data)
    }).catch((e) => console.log('something went wrong :(', e));
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/monthlyMoneyOut/moneyOutByMonth').then((response) => {
      setMoneyOutByMonth(response.data)
    }).catch((e) => console.log('something went wrong :(', e));
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/moneyOut').then((response) => {
      setMoneyOutItems(response.data)
    }).catch((e) => console.log('something went wrong :(', e));

  }, [axiosPrivate])

  //retrieving and setting up duedate for invoices
  useEffect(() => {

    const invDueDateArr = newInvoice.filter((dates) => {
      const invoiceDueDateObj = new Date(dates.invoiceDueDate);
      const daysDifferenceAsNumber = Number(dates.daysDifference);

      const dateTimeDiff = invoiceDueDateObj - todaysDate;
      const daysDiff = dateTimeDiff / (1000 * 60 * 60 * 24);

      return daysDiff <= daysDifferenceAsNumber;
    });
    setTotalInvoiceDue(invDueDateArr.length);
  }, [todaysDate]);


  useEffect(() => {
    axiosPrivate.get('/moneyInDaily/moneyInByDate').then((response) => {
      setMoneyInByDate(response.data);
    }).catch((error) => console.log(error))
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/moneyOutDaily/moneyOutByDate').then((response) => {
      setMoneyOutByDate(response.data);
    }).catch((error) => console.log(error))
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/allMonthlyBalanceDue/monthlyBalanceDue').then((response) => {
      setMonthlyBalanceDue(response.data);
    }).catch((error) => console.log(error))
  }, [axiosPrivate])

  useEffect(() => {
    axiosPrivate.get('/newInvoice').then((response) => {
      setNewInvoice(response.data);
    }).catch((error) => console.log(error))
  }, [axiosPrivate])

  //Extracts totalAmountIn from moneyInByMonth data, 
  //reduce the newly formed array newMoneyInMonthArr
  //via additon to get the total.
  const newMoneyInMonthArr = moneyInByMonth.map((item => { return Number(item.totalAmountIn) }))
  const totalMonthlyMoneyIn = newMoneyInMonthArr.reduce((total, balance) => total + balance, 0)

  const newMoneyOutMonthArr = moneyOutByMonth.map((item => { return Number(item.totalAmtOut) }))
  const totalMonthlyMoneyOut = newMoneyOutMonthArr.reduce((total, balance) => total + balance, 0)

  const newMoneyInDataArr = moneyInByDate.map((item => { return Number(item.totalAmountIn) }))
  const totalDailyMoneyIn = newMoneyInDataArr.reduce((total, balance) => total + balance, 0)

  const newMoneyOutArr = moneyOutByDate.map((item => { return Number(item.totalAmtOut) }))
  const totalDailyMoneyOut = newMoneyOutArr.reduce((total, balance) => total + balance, 0)

  const newMonthlyBalanceArr = monthlyBalanceDue.map((item => { return Number(item.balanceDue) }))
  const totalMonthlyBalanceDue = newMonthlyBalanceArr.reduce((total, balance) => total + balance, 0)

  const newInvoiceArr = newInvoice.map((item => { return Number(item.newInvoiceItemm[0]?.sentOutInvCount) }))
  const totalInvoiceSentOut = newInvoiceArr.reduce((total, invoice) => {
    if (!isNaN(invoice)) {
      return total + invoice
    } else return total
  }, 0)

  useEffect(() => {
    if (itemsList.length > 0) { // only log if the array has elements
      itemsList.slice(-4).reverse().map(obj => obj.newItems.map(item => console.log(item)))
    }
    setTotalBalance(totalMonthlyMoneyIn - totalMonthlyMoneyOut)

  }, [itemsList, moneyInByDate, moneyOutItems, totalMonthlyMoneyIn, totalMonthlyMoneyOut])




  return (
    <div className='homeLayOutt_Container'>
      <div className='invoice_to_moneyOut_wrapper'>
        <div className='moneyIn_moneyOut_wrapper'>
          {/* MoneyIn Card View */}
          <div className='moneyIn_container'>
            <div className='moneyIn_to_button'>
              <div className='moneyIn_to_button2'><div className='moneyIn'>Money In<div className='creditIncome'>Credit - Income (Daily)</div></div>
                <div className='amount'>N{totalDailyMoneyIn.toLocaleString()}</div>
                <button className='moneyIn_card_button' onClick={goToMoneyIn}>MONEY IN</button></div>
              <div className='circle_green2_wrapper'>
                <div className='circle_green2'>
                  <MoneyInIcon color={'white'} />
                </div>
              </div>
            </div>
          </div>
          {/* MoneyOut Card View */}
          <div className='moneyOut_container'>
            <div className='moneyIn_to_button'>
              <div className='moneyIn_to_button2'><div className='moneyIn'>Money Out<div className='creditIncome'>Debit - Expenses (Daily)</div></div>
                <div className='amount'>N{totalDailyMoneyOut.toLocaleString()}</div>
                <button className='moneyIn_card_button2' onClick={goToMoneyOut}>MONEY OUT</button></div>
              <div className='circle_green2_wrapper'>
                <div className='circle_orange2'>
                  <MoneyOutIcon color={'white'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='balance_yourDebt_wrapper'>
          {/* Total Balance Card View */}
          <div className='balanceDue_container'>
            <div className='circle_black'>
              <BalanceDueIcon color={'#faea11'} />
            </div>
            <div className='balanceDue'>Total Balance<div className='descriptive_text'>This value indicates the difference between total credit entries-MoneyIn and total debit entries-MoneyOut on a monthly bases</div></div>
            <div className='amount'>N{totalBalance.toLocaleString()}</div>
          </div>
          {/* Balance Due Card View */}
          <div className='yourDebt_container'>
            <div className='circle'>
              <YourDebtIcon color={'white'} />
            </div>
            <div className='yourDebt'>Balance Due<div className='descriptive_text'>This value indicates the total amount of money your customers owe you on a monthly bases</div></div>
            <div className='amount'>N{totalMonthlyBalanceDue.toLocaleString()}</div>
          </div>
        </div>
        {/* Invoice Data Card View */}
        <div className='invoice_Container'>
          <div className='invoice_content_wrap'>
            <div className='invoiceData'>Invoice Data<div className='monthly'>Monthly</div></div>
            <div className='icons_and_text2'>
              <div className='icons_and_texts'>
                <div className="circle">
                  <InvoiceOutIcon color={'white'} />
                </div>
                <div className='text_and_number'>
                  <div className='sentOut'>Sent Out</div><div className='number'>{totalInvoiceSentOut}</div>
                </div>
              </div>
              <div className='icons_and_texts'>
                <div className="circle_green">
                  <InvoiceDue color={'white'} />
                </div>
                <div className='text_and_number'>
                  <div className='sentOut'>Due</div><div className='number'>{totalInvoiceDue}</div>
                </div>
              </div>
              <div className='icons_and_texts'>
                <div className="circle_orange">
                  <InvoiceOpened color={'white'} />
                </div>
                <div className='text_and_number'>
                  <div className='sentOut'>Opened</div><div className='number'>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MoneyIn-MoneyOut Table View */}
      <div className='moneyInOut_transact_wrapper'>
        {/* MoneyIn Table View */}
        <div className='moneyInDailyTransact_container'>
          <div className='moneyIn_viewAll'><div className='moneyInTxt'>Money In</div><div className='viewAllTxt'><p><a href='/moneyInTransactList'>View All</a></p></div></div>

          {itemsList.length > 0 ? itemsList.slice(-2).reverse().map(obj => obj.newItems.map((itemz) => {
            const { productName, sellingPrice, selectedQtyNumber } = itemz;
            return (
              <div className='items_wrap'>
                <div className='img_item_qty'>
                  <div className='img'><MoneyInIcon2 color={'black'} /></div>
                  <div className='itm'>{productName}<div className='qty'>{selectedQtyNumber}
                  </div></div>
                </div>
                <div className='numbers2'>+N{sellingPrice.toLocaleString()}</div>
              </div>
            )
          })) : <div className='items_wrap'>
            <div className='img_item_qty'>
              <div className='img'><MoneyInIcon2 color={'black'} /></div>
              <div className='itm'>No Items Added Yet<div className='qty'>Nill<div className='edit_del_print'><EditIcon color={'black'} />. <DeleteIcon color={'black'} />. <PrintIcon2 color={'black'} /></div></div></div>
            </div>
            <div className='numbers2'>+N0.00</div>
          </div>}
        </div>
        <hr />
        {/* TMoneyOut Table View */}
        <div className='moneyOutDailyTransact_container'>
          <div className='moneyOut_viewAll'><div className='moneyOutTxt'>Money Out</div><div className='viewAllTxt'><p><a href='/moneyOutTransactList'>View All</a></p></div></div>
          {moneyOutItems.length > 0 ? moneyOutItems.slice(-2).reverse().map(obj => obj.newMoneyOutItem.map((itemz) => {
            const { product_service, cost_price, item_quantity } = itemz;
            return (
              <div className='items_wrap'>
                <div className='img_item_qty'>
                  <div className='img2'><MoneyOutIcon2 color={'#faea11'} /></div><div className='itm'>{product_service}<div className='qty'>{item_quantity}
                  </div></div>
                </div>
                <div className='numbers3'>-N{cost_price.toLocaleString()}</div>
              </div>
            )
          })) : <div className='items_wrap'>
            <div className='img_item_qty'>
              <div className='img2'><MoneyOutIcon2 color={'#faea11'} /></div><div className='itm'>No Transaction<div className='qty'>NILL
              </div></div>
            </div>
            <div className='numbers3'>-N0.00</div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default HomeLayOutt