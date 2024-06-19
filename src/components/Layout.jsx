import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

/**
 * A simple layout components that holds all UI components and makes it possible
 * for the navbar and footer to cut across all the UI components in the App.
 */

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout