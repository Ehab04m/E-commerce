import React from 'react'
import logo from "../../assets/FreshCart-logo.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { NavLink,Link, Navigate, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { TokenContext } from '../../Context/TokenContext'


export default function Navbar() {
  const {token,setToken} = useContext(TokenContext)

  const navigate = useNavigate()

  function logOut(){
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }
  
  return (


<nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex items-center ">
    <Link to={"/"} className="flex items-center  rtl:space-x-reverse mx-2">
      <img src={logo} className="h-8" alt="freshcart Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ">FreshCart</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
     {token && <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to={"/"} className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-gray-900 md:p-0 dark:text-white md:dark:text-green-500" aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink  to={"cart"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</NavLink>
        </li>
        <li>
          <NavLink to={"products"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
        </li>
        <li>
          <NavLink to={"categories"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categoriess</NavLink>
        </li>
       
       
    
      </ul>
    </div>}

    </div>
    <div className="hidden w-full md:block md:w-auto " id="navbar-default">
      <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-gray-900 md:p-0 dark:text-white md:dark:text-green-500" aria-current="page"><FaFacebook/></a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaInstagram/></a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaYoutube/></a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaLinkedin/></a>
        </li>
        <li>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><FaTiktok/></a>
        </li>
        {token &&<li>
          <div onClick={()=>{logOut()}} className="block  cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">SignOut</div>
        </li>}
        {!token && <>
        <li>
          <NavLink
          to={"login"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</NavLink>
        </li>
        <li>
          <NavLink to={"register"} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
        </li>

        </> }
        

        
    
      </ul>
    </div>
   
  </div>
</nav>


    
  )
}
