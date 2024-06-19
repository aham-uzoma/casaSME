import './ItemLists.css'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * This component displays Item lists in moneyIn, moneyOut and Inventory Components
 */


const ItemLists = ({ product_service,
  cost_price,
  item_quantity,
  totalAmtOut,
  newMoneyOutItem,
  showTotalCostPrice,
  showTotalAmtOut,
  setShowTotalCostPrice,
  setShowTotalAmtOut,
  setNewMoneyOutItem,
  totalCostPriceCount }) => {

  const totalCostPrice = newMoneyOutItem.reduce((total, item) => total + item.totalCostPriceCount, 0)

  const deleteItems = (itemsList) => {
    const newItemsData = newMoneyOutItem.filter((items) => items !== itemsList)
    setNewMoneyOutItem(newItemsData)
  }

  return (

    <div>
      <h3 className='itemstext'>ITEMS</h3>
      {newMoneyOutItem.map((items) => {
        const { product_service, cost_price, item_quantity, totalCostPriceCount } = items
        return (

          <div className='itemsList'>
            <div className='eachItmAdded'><div >{product_service}</div>
              <div >{totalCostPriceCount} = {cost_price} x {item_quantity}</div>
            </div>
            <div key={items.id} className='deleteEditFonts'><FontAwesomeIcon icon={faTrashCan} onClick={() => deleteItems(items)} /></div>

          </div>

        )
      })}
      {showTotalCostPrice && <div id='total_items' className='total_items'>Total:<div>{totalCostPrice}</div></div>}
      {showTotalAmtOut && <div id='total_items' className='total_items'>Total:<div>{totalAmtOut}</div></div>}


    </div>


  )
}

export default ItemLists