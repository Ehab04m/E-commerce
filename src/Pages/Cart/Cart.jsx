
import { Helmet } from "react-helmet"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import Loader from '../../Components/Loader/Loader.jsx'
import { FaRegTrashAlt } from "react-icons/fa"
import Popup from "reactjs-popup"
import { Link, useNavigate } from "react-router-dom"

export default function Cart() {
  const { getCartData,
    removeCartItem,
    updataProductQuantity,
    clearCart,
    setNumOfCartItems,
    setCartId } = useContext(CartContext)
  const [cartData, setCartData] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("")
  const handleOptionChange = (event) => {
    setPaymentMethod(event.target.value);
   
    
   
  }
  function handlePayMethod() {
   
    
    navigate("/checkout",{state: paymentMethod })
    
  }
  
  async function getLoggedCartData() {
    let response = await getCartData()
    setCartData(response.data)
    
    setOrderId(response.data.cartOwner)



  }
  async function deleteCartItem(id) {
    let response = await removeCartItem(id)
    setCartData(response.data)
    setNumOfCartItems(response.numOfCartItems);
    setCartId(response.cartId)
        





  }
  async function updataProduct(id, count) {
    let response = await updataProductQuantity(id, count)
    setCartData(response.data)





  }
  const closeModal = () => setIsOpen(false);
  async function clearAllCart() {
    let response = await clearCart()
    getLoggedCartData()
    closeModal()
    
    setNumOfCartItems(0);
    
    

    







  }
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  



  const handleNo = () => {

    closeModal();
  };
  useEffect(() => {
    getLoggedCartData();

  }, [])

  return (
    <div className="container mx-auto px-4 my-8">
  <Helmet>
    <title>Cart</title>
  </Helmet>

  {cartData ? (
    <>
      {/* Cart Heading and Total Price */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-2xl font-semibold text-purple-500">Shopping Cart</h4>
        <h6 className="text-gray-700">
          <span className="font-semibold">Total Price:</span> {cartData.totalCartPrice || "0"} EGP
        </h6>
      </div>

      {/* Cart Table */}
      <div className="relative overflow-hidden mb-8 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          {/* Table Header */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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

          {/* Table Body */}
          <tbody>
            {cartData?.products?.length > 0 ? (
              cartData.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Product Image */}
                  <td className="p-4">
                    <img
                      src={product.product?.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product?.title}
                      loading="lazy"
                    />
                  </td>

                  {/* Product Title */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {product.product?.title}
                  </td>

                  {/* Quantity Controls */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        disabled={product.count === 1}
                        onClick={() => updataProduct(product.product?.id, product.count - 1)}
                        className="disabled:cursor-not-allowed inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <p>{product.count}</p>
                      </div>
                      <button
                        onClick={() => updataProduct(product.product?.id, product.count + 1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  {/* Product Price */}
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {product.price} EGP
                  </td>

                  {/* Remove Button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCartItem(product.product?.id)}
                      className="font-medium text-xl text-red-600 hover:text-red-800"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Empty Cart and Order History Buttons */}
      <div className="flex justify-between items-center mb-6">
        {cartData.products.length > 0 && (
           <button
           onClick={togglePopup}
           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
         >
           Empty Cart
         </button>
        )}
       
        <Link
          to={`/allorders/${orderId}`}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none  focus:ring-purple-300"
        >
          View Order History
        </Link>
      </div>

      {/* Payment Method Selection and Checkout Button */}
      {cartData.products.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="font-semibold mb-4">Select Payment Method:</h3>
          <div className="flex gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="online"
                name="payment"
                value="online"
                onChange={handleOptionChange}
                className="mr-2"
              />
              <label htmlFor="online" className="text-gray-700">
                Online
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                onChange={handleOptionChange}
                className="mr-2"
              />
              <label htmlFor="cash" className="text-gray-700">
                Cash
              </label>
            </div>
          </div>
          <button
            disabled={!paymentMethod}
            onClick={handlePayMethod}
            className="w-full disabled:bg-green-300 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Popup for Empty Cart Confirmation */}
      {isOpen && (
        <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} position="center center">
          <div className="modal bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <button className="close text-gray-600 hover:text-gray-800" onClick={closeModal}>
              &times;
            </button>
            <div className="header text-lg font-semibold mb-4">
              Are you sure you want to empty your cart?
            </div>
            <div className="content flex justify-center gap-4">
              <button
                className="yes bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={clearAllCart}
              >
                Yes
              </button>
              <button
                className="no bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={handleNo}
              >
                No
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  ) : (
    <Loader />
  )}
</div>
  )
}
