import MainLayout from './Pages/MainLayout/MainLayout'
import Home from "./Pages/Home/Home"
import Products from './Pages/Products/Products.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Categories from './Pages/Categories/Categories.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import CounterProvider from './Context/CounterContext'
import TokenContextProvider from './Context/TokenContext'
import ProtectedRouters from './Components/ProtectedRouters/ProtectedRouters.jsx'
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import { Offline } from 'react-detect-offline'
import { RiWifiOffLine } from 'react-icons/ri'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'

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
          path: "productdetails/:productId", element: <ProtectedRouters>
            <ProductDetails />
          </ProtectedRouters>
        },
        {
          path: "cart", element: <ProtectedRouters>
            <Cart/>
          </ProtectedRouters>
        },
        {
          path: "categories", element: <ProtectedRouters>
            <Categories />
          </ProtectedRouters>
        },
        { path: "*", element: <NotFound /> },

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }

      ]
    }

  ])


  return (
    <>
      <TokenContextProvider>
        <CartContextProvider>
        <CounterProvider>
        <Offline>
          <div className="offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold z-40">
            <RiWifiOffLine className='inline mx-2 text-xl' />
            You Are Now Offline
           
              
          </div>




        </Offline>
        <Toaster/>



        <RouterProvider router={router} />
      </CounterProvider>

        </CartContextProvider>
    

    </TokenContextProvider >



    </>

  )
}

export default App
