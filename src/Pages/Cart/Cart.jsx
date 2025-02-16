
import { Helmet } from "react-helmet"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import Loader from '../../Components/Loader/Loader.jsx'
import { FaRegTrashAlt } from "react-icons/fa"
import Popup from "reactjs-popup"

export default function Cart() {
  const {getCartData,removeCartItem,updataProductQuantity,clearCart}  = useContext(CartContext)
  const [cartData, setCartData] = useState(null)
  async function getLoggedCartData() {
    let response = await getCartData()
    setCartData(response.data)
    console.log(response.data);
    

    
  }
  async function deleteCartItem(id) {
    let response = await removeCartItem(id)
    setCartData(response.data)
    
    
    

    
  }
  async function updataProduct(id,count) {
    let response = await updataProductQuantity(id,count)
    setCartData(response.data)
    
    
    

    
  }
  async function clearAllCart() {
    let response = await clearCart()
    setCartData(response.data)
    
    
    

    
  }
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
  const closeModal = () => setIsOpen(false);

 

  const handleNo = () => {
   
    closeModal();
  };
  useEffect(() => {
    getLoggedCartData();
  
  }, [])
  
  return (
    <div className="relative mb-11">
      <Helmet>
        <title>cart</title>

      </Helmet>
      {cartData ? <>
        <div className="flex justify-between">
        <h4 className="text-2xl font-medium text-green-500">Shopping Cart</h4>
        <h6><span className = "font-semibold">Total Price:</span>
        {cartData.totalCartPrice?  cartData.totalCartPrice : "0"} EGP
        </h6>
      </div>


<div className="relative overflow-x-auto  mb-20 shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartData?.products?.length > 0 ? cartData?.products.map((product) => {
        return (
          <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <img src={product.product?.imageCover
} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product?.title} />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.product?.title}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <button
              disabled={product.count === 1}
               onClick={()=>{
                updataProduct(product.product?.id,product.count -1)
              }} className=" disabled:cursor-not-allowed inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                </svg>
              </button>
              <div>
                <p>{product.count}</p>
                
              </div>
              <button  onClick={()=>{
                updataProduct(product.product?.id,product.count +1)
              }}className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </td>
          <td className=" px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.price} EGP
          </td>
          <td className="px-6 py-4">
            <button onClick={() =>{
              deleteCartItem(product.product?.id)
              
            }}   className="font-medium text-xl text-red-600 dark:text-red-500 hover:underline"><FaRegTrashAlt /></button >
          </td>
        </tr>

        )
      }) : "No Data Found"}
    
     
    </tbody>
  </table>
  
</div>
{cartData.products.length > 0 && <button className="absolute right-0 -bottom-[58px]  bg-red-500  text-white cursor-pointer text-center my-2  hover:bg-red-800 focus:ring-4 focus:ring-red-300 disabled:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
      onClick={togglePopup}>Empty Cart</button>
      }
      {isOpen && (
        <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} position="center center">
        <div className="modal">
          <button className="close" onClick={closeModal}>&times;</button>
          <div className="header"> Are you sure you want to empty your cart ?</div>
          <div className="content">
            <button className="yes" onClick={clearAllCart}>Yes</button>
            <button className="no" onClick={handleNo}>No</button>
          </div>
        </div>
      </Popup>
     
      )}


    




      
      
      </> : <Loader/>}
  

      
    </div>
  )
}
