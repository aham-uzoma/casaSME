import './Inventory.css'
import StockCountValue from '../../components/StockCountValue/StockCountValue'
import StockItems from '../../components/StockItems/StockItems'

/**
 * This component is made up of two other components
 * StockItems and StockCountValue. StockItems Shows all Items that 
 * exists in the inventory and more details about the inventory.
 * the StockCountValue on the otherhand display the amount of Items in stock or
 * Out of Stock, it shows the Total stock values, 
 * 
 */

const Inventory = () => {

  return (
    <>
      <div className='blackSurface__Inv'><h1>Inventory.</h1></div>
      <div className='inventory_Div'>
        <div className='inventory__wrapper'>
          <StockItems />
          <StockCountValue />
        </div>
      </div>
    </>
  )
}

export default Inventory