import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { userId } = useParams()
  const userName = localStorage.getItem("userName")

  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("desc"); // Default descending order

  // Handle sorting
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "price") {
      return sortOrder === "asc"
        ? a.totalOrderPrice - b.totalOrderPrice
        : b.totalOrderPrice - a.totalOrderPrice;
    } else if (sortBy === "status") {
      return sortOrder === "asc"
        ? a.isPaid - b.isPaid || a.isDelivered - b.isDelivered
        : b.isPaid - a.isPaid || b.isDelivered - a.isDelivered;
    }
    return 0;
  });

  // Handle view details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };
 
  const closeModal = () => {
    setSelectedOrder(null);
  };
  async function getAllOrders() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((response) => {
        
        setOrders(response.data)

      })
      .catch((error) => {
       
      })

  }
  useEffect(() => {
    getAllOrders()

  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        <div className="text-gray-600">
          Welcome, <span className="font-semibold text-purple-700">{userName}</span>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="flex items-center space-x-4 mb-6">
        <label className="text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="date">Date</option>
          <option value="price">Total Price</option>
          <option value="status">Status</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOrders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Order ID */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Order #{order.id}</h2>

            {/* Order Details */}
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Total:</span> ${order.totalOrderPrice}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Payment Method:</span> {order.paymentMethodType}
            </p>

            {/* Order Status */}
            <div className="flex items-center space-x-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${order.isDelivered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>

            {/* Item Thumbnails */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
              <div className="flex space-x-2">
                {order.cartItems.slice(0, 3).map((item) => (
                  <div key={item._id} className="relative group">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      loading="lazy"
                    />
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
                      {item.product.title.split(" ").slice(0, 2).join(" ")}...
                    </div>
                  </div>
                ))}
                {order.cartItems.length > 3 && (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 text-sm text-gray-600">
                    +{order.cartItems.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(order)}
              className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            {/* Modal Header */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>

            {/* Order Information */}
            <p className="text-gray-600 mb-2">
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Total:</strong> ${selectedOrder.totalOrderPrice}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Payment Method:</strong> {selectedOrder.paymentMethodType}
            </p>

            {/* Items List */}
            <div className="mt-4">
              <h3 className="font-medium text-gray-800 mb-2">Items:</h3>
              {selectedOrder.cartItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 mb-3">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.product.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );



}
