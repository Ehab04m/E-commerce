import MainLayout from './Pages/MainLayout/MainLayout'
import Home from "./Pages/Home/Home"
import Products from './Pages/Products/Products.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Categories from './Pages/Categories/Categories.jsx'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import './App.css'

import TokenContextProvider from './Context/TokenContext'
import ProtectedRouters from './Components/ProtectedRouters/ProtectedRouters.jsx'
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import { Offline } from 'react-detect-offline'
import { RiWifiOffLine } from 'react-icons/ri'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Pages/CheckOut/CheckOut.jsx'
import AllOrders from './Pages/AllOrders/AllOrders.jsx'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword.jsx'
import VerificationCode from './Pages/VerificationCode/VerificationCode.jsx'
import AuthenticationProvider from './Context/AuthenticationContext.jsx'
import ResetPassword from './Pages/ResetPassword/ResetPassword.jsx'
import WishlistProvider from './Context/WhishlistContext/WishlistContext.jsx'
import Wishlist from './Pages/Wishlist/Wishlist.jsx'
import ChangePassword from './Pages/ChangePassword/ChangePassword.jsx'
import ChangeUserData from './Pages/ChangeUserData/ChangeUserData.jsx'
import Brands from './Pages/Brands/Brands.jsx'

function App() {
 
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true, element: <ProtectedRouters>
            <Home />
          </ProtectedRouters>
        },
        {
          path: "products", element: <ProtectedRouters>
            <Products />
          </ProtectedRouters>
        },
        {
          path: "productdetails/:productId/:category", element: <ProtectedRouters>
            <ProductDetails />
          </ProtectedRouters>
        },
        {
          path: "changepassword", element: <ProtectedRouters>
            <ChangePassword />
          </ProtectedRouters>
        },
        {
          path: "changeuserdata", element: <ProtectedRouters>
            <ChangeUserData />
          </ProtectedRouters>
        },
        {
          path: "allorders/:userId", element: <ProtectedRouters>
            <AllOrders/>
          </ProtectedRouters>
        },
        {
          path: "cart", element: <ProtectedRouters>
            <Cart/>
          </ProtectedRouters>
        },
        {
          path: "wishlist", element: <ProtectedRouters>
            <Wishlist/>
          </ProtectedRouters>
        },
        {
          path: "brands", element: <ProtectedRouters>
            <Brands/>
          </ProtectedRouters>
        },
        {
          path: "checkout", element: <ProtectedRouters>
            <CheckOut />
          </ProtectedRouters>
        },
        {
          path: "categories", element: <ProtectedRouters>
            <Categories />
          </ProtectedRouters>
        },
        { path: "*", element: <NotFound /> },

        { path: "login", element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verificationcode", element: <VerificationCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "register", element: <Register /> }

      ]
    }

  ])


  return (
    <>
      <TokenContextProvider>
        <WishlistProvider>
        <CartContextProvider>
        <AuthenticationProvider>
        <Offline>
          <div className="offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold z-40">
            <RiWifiOffLine className='inline mx-2 text-xl' />
            You Are Now Offline
           
              
          </div>




        </Offline>
        <Toaster/>



        <RouterProvider router={router} />
      </AuthenticationProvider>

        </CartContextProvider>
    

        </WishlistProvider>

      

    </TokenContextProvider >



    </>

  )
}

export default App
