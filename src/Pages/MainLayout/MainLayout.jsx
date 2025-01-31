import styles from "./MainLayout.module.css"
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
    

      <Footer/>
      
    </div>
  )
}
