import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useState } from 'react'
import axios from 'axios'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../../Context/AuthenticationContext'

export default function changeMyPassword() {
    const navigate = useNavigate() 
    const {updatePassword}= useContext(AuthenticationContext)
    const [isChanged, setIsChanged] = useState(false)


   
    const initialValues = {
      currentPassword:"",
      password:"",
      rePassword:""
        
      }
    const validationSchema = Yup.object({
      currentPassword:Yup.string().required("Required!").matches(/^[A-Za-z1-9]{6,15}$/,"Password is not valid"),
       password:Yup.string().required("Required!").matches(/^[A-Za-z1-9]{6,15}$/,"Password is not valid"),
       rePassword:Yup.string().required().oneOf([Yup.ref("password")],"Password must be same"),
      
     })
    async function handleSubmit(data){
      let response = await updatePassword(data.currentPassword,data.password,data.rePassword)
      
      if(response.message=== "success"){
        setIsChanged(true)
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
        <h1 className="text-3xl font-bold my-3">Change Your Password</h1>
        <p className="text-gray-600 mb-3">
        Enter new password and confirm it to change your password
    </p>

        </section>
        {isChanged && <div className="text-green-400 mx-auto text-center my-1 font-medium p-2 rounded-lg">Your Password has been updated successfully</div>}
        <form className="relative flex flex-col justify-center items-center " onSubmit={formik.handleSubmit}>
        <div className="mb-7 ">
      <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Current Password</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="currentPassword" name="currentPassword" value={formik.values.currentPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Current password"  />
      {(formik.touched.currentPassword && formik.errors.currentPassword) && <small className="text-red-500">{formik.errors.currentPassword}</small> }
      <Link className="block mt-2 text-sm text-blue-500 hover:text-blue-700" to="/forgetpassword">Forgot your password?</Link>

    
    </div>
        <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New password"  />
      {(formik.touched.password && formik.errors.password) && <small className="text-red-500">{formik.errors.password}</small> }
    </div>
    <div className="mb-5 relative">
      <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="rePassword" name="rePassword" value={formik.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your rePassword"  />
      {(formik.touched.rePassword && formik.errors.rePassword) && <small className="text-red-500">{formik.errors.rePassword}</small> }
     
    </div>
    
    <button disabled={!formik.isValid} onClick={handleSubmit} type='submit' className='btn sm:w-1/3   ' >Confirm</button>
    
    
    </form>


    </div>
  )
}

