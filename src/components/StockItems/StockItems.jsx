import React, { useEffect, useState } from 'react'
import './StockItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import StockItemList from './StockItemList'
import { Button } from '@mui/material'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

/**
 * This component handles Inventory, i.e it handles the stockItems display,
 * Searching, Deleting and more.
 */


const StockItems = ({ productName,
  sellingPrice,
  costPrice,
  quantityCount,
  newProductInv,
  unitOfQuantity,
}) => {

  const [stockItemsList, setStockItemsList] = useState([])
  const [showCheckBox, setShowCheckBox] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [isCHecked, setIsChecked] = useState([])
  const [foundStockItem, setFoundStockItem] = useState([])
  const [searcBoxx, setSearchBoxx] = useState('')
  const [showNoResult, setShowNoResult] = useState(false)
  const [showStockList, setShowStockList] = useState(true)

  const [show, setShow] = useState(5);
  const [button_text, setButton_Text] = useState("See more...");

  const axiosPrivate = useAxiosPrivate()

  const handleShowMoreOrLess = () => {
    if (show < stockItemsList.length) {
      setShow(stockItemsList.length)
      setButton_Text('Show less...')
    } else {
      setShow(Math.min(5, stockItemsList.length))
      setButton_Text('show more...')
    }
  }

  useEffect(() => {
    axiosPrivate.get('/newItems').then((response) => {
      setStockItemsList(response.data)
    }).catch((e) => console.log('something went wrong :(', e));
    setShowNoResult(false)
  }, [])

  const performSearch = (e) => {
    const searchWord = e.target.value
    if (searchWord !== '') {
      const foundResults = stockItemsList.filter((items) => {
        return items.productName
          .toLowerCase()
          .startsWith(searchWord.toLowerCase())
      })
      setFoundStockItem(foundResults)
      setShowStockList(false)
    } else {
      setShowNoResult(true)
      setFoundStockItem(stockItemsList)
    }
    setSearchBoxx(searchWord)
  }

  const handlecheckbox = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setIsChecked([...isCHecked, value])
    } else
      setIsChecked(isCHecked.filter((e) => e !== value))
  }
  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your data has been deleted.",
          icon: "success"
        });
        deleteAll()
      }
    });

  }

  const deleteAll = async () => {
    await axiosPrivate.delete('newItems', { data: isCHecked }).then((response) => {
    })
      .catch((e) => console.log('something went wrong :(', e));
    window.location.reload(true)
  }

  const showHideCheckBox = () => {
    setShowCheckBox((showCheckBox) => !showCheckBox)
  }
  const toggleSearchBoxVisibility = () => {
    setShowSearchBox((showSearchBox) => !showSearchBox)
  }

  return (
    <>
      <div className='StockItemsList_Wrapper'>
        <div className='searchAddDelete_Wrapper'>
          <div className='item_search'>
            <h2 className='ItemsTxt'>Items</h2>
            {showSearchBox &&
              <div className='search_box_div'>
                <form id='searchBox_Form' className='searchBox_Form'>
                  <input id='search_detail' type='Search' value={searcBoxx} className='search_detail' placeholder='Search'
                    onChange={(e) => performSearch(e)} />
                </form>
              </div>}
          </div>
          <div className='glass_plus_trash'><FontAwesomeIcon icon={faMagnifyingGlass} cursor='pointer'
            onClick={toggleSearchBoxVisibility} />
            <FontAwesomeIcon icon={faXmark} cursor='pointer' onClick={showHideCheckBox} />
            <FontAwesomeIcon icon={faTrash} cursor='pointer' onClick={handleDeleteAll} />
          </div>

        </div>

        {foundStockItem && foundStockItem.length > 0 ? (
          foundStockItem.slice(0).reverse().map((details) => {
            const { productName, sellingPrice, quantityCount } = details
            return (

              <StockItemList key={details.productName} productName={productName}
                sellingPrice={sellingPrice}
                costPrice={costPrice}
                quantityCount={quantityCount}
                details={details}
                showCheckBox={showCheckBox}
                handlecheckbox={handlecheckbox}
                unitOfQuantity={unitOfQuantity} />
            )
          })) :
          (showNoResult && <h1>No results found!</h1>)}
        {showStockList && stockItemsList.slice(stockItemsList.length - show, stockItemsList.length).reverse().map((details) => {
          const { productName, sellingPrice, quantityCount } = details
          return (
            <StockItemList key={details.productName} productName={productName}
              sellingPrice={sellingPrice}
              costPrice={costPrice}
              quantityCount={quantityCount}
              details={details}
              showCheckBox={showCheckBox}
              handlecheckbox={handlecheckbox}
              unitOfQuantity={unitOfQuantity} />

          )
        })}

        <Button onClick={handleShowMoreOrLess}>{button_text}</Button>

      </div>
    </>
  )
}

export default StockItems