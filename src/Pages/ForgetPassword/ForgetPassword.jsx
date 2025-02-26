import { useFormik } from 'formik'
import * as Yup from "yup"
import React from 'react'
import axios from 'axios'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../../Context/AuthenticationContext'

export default function ForgetPassword() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate() 
    const {forgotPassword}= useContext(AuthenticationContext)


   
    const initialValues = {
        email:"",
        
      }
    const validationSchema = Yup.object({
       
        email:Yup.string().email("Invalid email format").required("Required!"),
        
      })
    async function handleSubmit(data){
      let response = await forgotPassword(data.email)
      console.log(response);
      if(response.statusMsg === "success"){
        localStorage.setItem("userEmail",data.email)
        navigate("/verificationcode")
        
        
      }
      
      
        
        

    }
    
      
      const formik = useFormik({
        initialValues,
       
        onSubmit:handleSubmit,
        validationSchema,
      })



  return (
    <div>
        <section className="  mx-auto text-center mt-9">
        <h1 className="text-3xl font-bold my-3">Forgot password?</h1>
        <p className="text-gray-600">
        No worries, we'll send you reset instructions
    </p>

        </section>
        <form className="relative flex flex-col justify-center items-center " onSubmit={formik.handleSubmit}>

    <div className="mb-5 w-1/2 mx-auto mt-6 translate-x-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your email" />
      {(formik.touched.email && formik.errors.email) && <small className="text-red-500">{formik.errors.email}</small> }
    </div>
    <button disabled={!formik.isValid} onClick={handleSubmit} type='submit' className='btn sm:w-1/3  ' >Reset password</button>
   {!token && 
    <Link to={"/login"} className='flex justify-center items-center gap-2  font-bold my-5'>
    <span><FaArrowLeftLong />
    </span>
    Back to log in

    </Link>}
    
    </form>


    </div>
  )
}
