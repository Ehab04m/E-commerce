import styles from "./MainLayout.module.css"
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />
  
      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </div>
        </div>
      </main>
  
      
      <Footer/>
    </div>
  )  
}
