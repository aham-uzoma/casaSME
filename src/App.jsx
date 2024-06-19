import HomeLayOutt from './pages/HomeLayOutt/HomeLayOutt'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MoneyIn from './pages/MoneyIn'
import MoneyOut from './pages/moneyOutPage/MoneyOut'
import Inventory from './pages/Inventory/Inventory'
import EdittInventory from './components/StockItems/EdittInventory'
import Invoice from './pages/Invoice/Invoice'
import InvoiceData from './pages/Invoice/InvoiceData'
import Invoices from './pages/Invoice/Invoices'
import OutofStockItems from './components/StockItems/OutofStockItems'
import MoneyInTransactList from './pages/MoneyInTransactList'
import MoneyOutTransactList from './pages/moneyOutPage/MoneyOutTransactList'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import PersistLogIn from './components/PersistLogIn'
import RequireAuth from './components/RequireAuth'
import LogInPage from './pages/LogInPage/LogInPage'
import BusinessDetailsPage from './pages/BusinessDetailsPage/BusinessDetailsPage'
import EditBusinessDetails from './pages/BusinessDetailsPage/EditBusinessDetails'
import WelcomePage from './pages/WelcomePage/WelcomePage'

/**
 * This component is responsible for all necessary page routing
 * in the entire application. It takes care of protected and 
 * unprotected routing
 * 
 */

const App = () => {
  return (

    <Routes>

      {/* Opened or Unprotected Routes */}
      <Route path='welcome' element={<WelcomePage/>}/>

      <Route path='registerPage' element={<RegisterPage />} />

      <Route path='logIn' element={<LogInPage />} />
      
      {/* Protected Routes */}
      <Route element={<PersistLogIn/>}>

      <Route element={<RequireAuth />}>

        <Route path='/' element={<Layout />}>

          <Route index element={<HomeLayOutt />} />

          <Route path='BusinessDetailsPage' element={<BusinessDetailsPage/>}/>

          <Route path='EditBusinessDetails' element={<EditBusinessDetails/>}/>

          <Route path='moneyIn' element={<MoneyIn />} />

          <Route path='moneyOut' element={<MoneyOut />} />

          <Route path='inventory' element={<Inventory />} />

          <Route path='editInventory/:id' element={<EdittInventory />} />

          <Route path='invoice' element={<Invoice />} />

          <Route path='invoices' element={<Invoices />} />

          <Route path='outofStockItems' element={<OutofStockItems />} />

          <Route path='moneyInTransactList' element={<MoneyInTransactList />} />

          <Route path='moneyOutTransactList' element={<MoneyOutTransactList />} />

        </Route>

        <Route path='invoiceData/:id' element={<InvoiceData />} />

      </Route>

      </Route>

    </Routes>

  )
}

export default App