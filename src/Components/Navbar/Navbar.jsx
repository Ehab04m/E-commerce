import React, { useEffect } from 'react'
import logo from "../../assets/FreshCart-logo.png"
import { FaChevronDown, FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaTiktok, FaUser, FaYoutube } from 'react-icons/fa'
import { NavLink,Link, Navigate, useNavigate, Links } from 'react-router-dom'

import { useContext } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import { TiShoppingCart } from 'react-icons/ti'
import { CartContext } from '../../Context/CartContext'
import { useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { AuthenticationContext } from '../../Context/AuthenticationContext'
import { WishlistContext } from '../../Context/WhishlistContext/WishlistContext'



export default function Navbar() {
  const {token,setToken} = useContext(TokenContext)
  const {numOfCartItems} = useContext(CartContext)
  const {numOfWishlistItems} = useContext(WishlistContext)
  
  const {userName,userEmail,setUserEmail,setUserName} =useContext(AuthenticationContext)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const handleMenuToggle = () => {
    setIsNavVisible(!isNavVisible);
  };
  
  

  const handleIconClick = () => {
    setIsMenuVisible(!isMenuVisible);
  }

  const navigate = useNavigate()

  function logOut(){
    localStorage.removeItem("token")
    setToken(null)
    navigate("login")
  }
  useEffect(() => {
    console.log("hiii")
    setUserEmail(localStorage.getItem("userEmail"))
    setUserName(localStorage.getItem("userName"))
  
   
  }, [])
  
  return (


<nav className="bg-purple-700 border-gray-100 dark:bg-gray-900 sticky top-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Logo and Brand Name */}
    <div className="flex items-center">
      <Link to={"/"} className="flex items-center rtl:space-x-reverse mx-2">
        <img src={logo} className="h-8" alt="freshcart Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white hover:text-teal-300 transition-colors duration-200">FreshCart</span>
      </Link>
      {/* Hamburger Menu Button */}
      <button
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-controls="navbar-default"
        aria-expanded={isNavVisible}
        onClick={handleMenuToggle}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>

    {/* Navigation Links */}
    <div className={`${isNavVisible ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
      <ul className="font-medium bg-purple-200 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {/* Main Links */}
        {token && (
          <>
            <li>
              <NavLink to={"/"} className="block py-2 px-3 rounded md:bg-transparent  md:hover:text-teal-300 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200" aria-current="page">Home</NavLink>
            </li>
            <li>
              <NavLink to={"cart"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Cart</NavLink>
            </li>
            <li>
              <NavLink to={"products"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Products</NavLink>
            </li>
            <li>
              <NavLink to={"categories"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Categories</NavLink>
            </li>
            <li>
              <NavLink to={"brands"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Brands</NavLink>
            </li>
            <li>
              <NavLink to={"wishlist"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Wishlist</NavLink>
            </li>
          </>
        )}

        {/* Social Icons */}
        <li className="flex items-center space-x-4">
          <a href="#" className="text-white hover:text-teal-300 transition-colors duration-200"><FaFacebook /></a>
          <a href="#" className="text-white hover:text-teal-300 transition-colors duration-200"><FaInstagram /></a>
          <a href="#" className="text-white hover:text-teal-300 transition-colors duration-200"><FaYoutube /></a>
          <a href="#" className="text-white hover:text-teal-300 transition-colors duration-200"><FaLinkedin /></a>
          <a href="#" className="text-white hover:text-teal-300 transition-colors duration-200"><FaTiktok /></a>
        </li>

        {/* User Actions */}
        {token && (
          <>
            <li>
              <div className="mt-3 md:mt-0">
                <NavLink to={"wishlist"} className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">
                  <FaHeart className="text-2xl font-semibold hover:text-red-600 text-red-500" />
                  <span className="absolute flex justify-center items-center bg-red-400 w-5 h-5 rounded-full -top-2 translate-x-4 md:translate-x-0 md:-top-3 md:-right-4">{numOfWishlistItems}</span>
                </NavLink>
              </div>
            </li>
            <li>
              <NavLink to={"cart"} className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">
                <TiShoppingCart className="text-2xl font-semibold" />
                <span className="absolute flex justify-center items-center bg-teal-400 w-5 h-5 rounded-full -top-2 translate-x-4 md:translate-x-0 md:-top-3 md:-right-4">{numOfCartItems}</span>
              </NavLink>
            </li>
            <li>
              <div className="user-menu">
                <FaUser className="user-icon cursor-pointer text-black hover:text-teal-300 transition-colors duration-200" onClick={handleIconClick} />
                <div className={`dropdown-menu ${isMenuVisible ? 'visible' : ''}`}>
                  <div className="dropdown-item ">User Name: <span className='text-purple-900 font-semibold'>
                  {userName}
                    </span> </div>
                  <div className="dropdown-item whitespace-nowrap overflow-hidden text-ellipsis">Email: {userEmail}</div>
                  <div className="dropdown-item dropdown-item-account">
                    Account Settings
                    <span><FaChevronDown className="ms-auto p-1" /></span>
                    <div className="nested-dropdown">
                      <Link to={"changeuserdata"}>
                        <div className="dropdown-item drop-link">Change Your Data</div>
                      </Link>
                      <Link to={"changepassword"}>
                        <div className="dropdown-item drop-link">Change Password</div>
                      </Link>
                    </div>
                  </div>
                  <Link to={"wishlist"}>
                    <div className="dropdown-item drop-link">Wishlist</div>
                  </Link>
                  <div onClick={logOut} className="dropdown-item flex items-center drop-link cursor-pointer">
                    Logout <span className="ps-2"><CiLogout /></span>
                  </div>
                </div>
              </div>
            </li>
          </>
        )}

        {/* Login and Register Links */}
        {!token && (
          <>
            <li>
              <NavLink to={"login"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Login</NavLink>
            </li>
            <li>
              <NavLink to={"register"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-300 transition-colors duration-200">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>


    
  )
}
