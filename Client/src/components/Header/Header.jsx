import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useCart } from '../../context/Context';
import './Header.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {

  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 5) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const getMenu = localStorage.getItem("activeLink");
  const [menu, setMenu] = useState(getMenu || "shop");

  useEffect(() => {
    localStorage.setItem("activeLink", menu);
  }, [menu])


  // Aese bhi lesakte h or state.cart karke bhi isse faida ye hua k destructure karke cart ek variable bangaya
  const { userState: { user,details }, userDispatch, state: { cart }, dispatch, productDispatch } = useCart();

  const notify = () => {

    toast.info("Please Login First !", {
      position: toast.POSITION.TOP_CENTER
    });

  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Navbar sticky='top' className={colorChange ? "colorChange" : ""}>
        <Container>
          <Navbar.Brand>
            <Link
              to='/'
              onClick={() => { setMenu("shop"); setIsNavExpanded(false) }}
            >
              <img src={logo} alt="Brand Logo" />
            </Link>
          </Navbar.Brand>
          <button
            className="hamburger"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >

            <GiHamburgerMenu />
          </button>
          <div className={`${isNavExpanded ? 'navigation expanded' : 'navigation'}`}>
            <ul className='nav-menu'>
              <li onClick={() => { setMenu("shop"); setIsNavExpanded(false); }}><Link to='/'>Home</Link> {menu === "shop" ? (<hr />) : (<></>)}</li>
              <li onClick={() => { setMenu("mens"); setIsNavExpanded(false); }}><Link to='/products'>Products</Link> {menu === "mens" ? (<hr />) : (<></>)}</li>
              <li onClick={() => { setMenu("womens"); setIsNavExpanded(false); }}><Link to='/categories'>Categories</Link> {menu === "womens" ? (<hr />) : (<></>)}</li>
              <li onClick={() => { setMenu("kids"); setIsNavExpanded(false); }}><Link to='/cart'>Cart</Link> {menu === "kids" ? (<hr />) : (<></>)}</li>
            </ul>
          </div>
          {
            menu === "mens" ? (
              <Navbar.Text className='search'>
                <FormControl
                  style={{ width: 300 }}
                  placeholder='Search a product'
                  className='m-auto'
                  onChange={(e) => {
                    productDispatch({
                      type: 'FILTER_BY_SEARCH',
                      payload: e.target.value
                    })
                  }}
                />
              </Navbar.Text>
            ) : (
              null
            )
          }
          <div className="nav-login-cart">
            {
              user ? (
                <button
                  onClick={() => userDispatch({
                    type: 'LOGOUT'
                  })}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to='/login'
                  onClick={() => setMenu("login")}
                >
                  <button>Login</button>
                </Link>
              )
            }
            <Link
              to='/cart'
              onClick={() => setMenu("kids")}
            >
              <img src={cart_icon} alt="cart_icon" />
            </Link>
            <div className="nav-cart-count">{cart.length}</div>
          </div>
          <div className='user-icon ms-5 d-flex flex-column'>
            <img src={user ? details.profile : null} />
            <h5>{user ? details.username : null}</h5>
          </div>  
        </Container>
      </Navbar>
    </>
  )
}

export default Header