// Now the App.jsx is our Home page

import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Link, Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { Cart, Categories, Checkout, Home, Products, SingleCategory, SingleProduct } from './pages'
import { Contact, Footer, Header, Login, Signup } from './components'
import { useCart } from './context/Context'
import axios from 'axios'
import { AdminHeader } from './Admin/components'
import { AdminCategories, AdminHome, Brands, AdminProducts, Orders } from './Admin/pages'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const AppRoute = "/"

const App = () => {

  const [userRole, setuserRole] = useState("");
  const { userState: { user }, userDispatch } = useCart();

  useEffect(() => {
    if (user) {
      const getDecode = jwtDecode(Cookies.get("token"));
      if (getDecode.role === "admin") {
        setuserRole("admin");
      } else if (getDecode.role === "user") {
        setuserRole("user");
      } else {
        setuserRole("guest");
      }

      userDispatch({
        type: 'GET_DETAILS',
        payload: getDecode
      });
    } else {
      setuserRole("guest");
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        {
          userRole === "admin" ? (
            (<AdminHeader />)
          ) :
            <Header />
        }
        <Routes>
          {
            userRole === "admin" ? (
              <>
                <Route path='/' element={<AdminHome />} />
                <Route path='/categories' element={<AdminCategories />} />
                <Route path='/brands' element={<Brands />} />
                <Route path='/products' element={<AdminProducts />} />
                <Route path='/orders' element={<Orders />} />
              </>
            ) : userRole === "guest" ?
              (
                <>
                  <Route path='/' element={<Home />} />
                  {
                    userRole === "guest" ?
                      (<Route path='/login' element={<Login />} />)
                      :
                      (null)
                  }
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/products/:productId' element={<SingleProduct />} />
                  <Route path='/category/:categoryName' element={<SingleCategory />} />
                  <Route path='/categories' element={<Categories />} />
                  <Route path="*" element={<Navigate to="/login" replace={true} />} />
                </>
              )
              : userRole === "user" ?
                (
                  <>
                    <Route path='/' element={<Home />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/products/:productId' element={<SingleProduct />} />
                    {
                      userRole === "user" ?
                        <>
                          <Route path='/login' element={<Login />} />
                          <Route path='/checkout' element={<Checkout />} />
                        </>
                        :
                        (null)
                    }
                    <Route path='/categories' element={<Categories />} />
                    <Route path='/category/:categoryName' element={<SingleCategory />} />
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                  </>
                )
                :
                (null)
          }
        </Routes>
        {
          userRole == "admin" ? (
            (null)
          ) :
            <Footer />
        }
      </BrowserRouter>
    </>
  )
}

export default App