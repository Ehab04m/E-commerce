import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useState } from 'react'
import axios from 'axios'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthenticationContext } from '../../Context/AuthenticationContext'

export default function changeuserdata() {
    const navigate = useNavigate() 
    const {updateUserData,setUserEmail,setUserName}= useContext(AuthenticationContext)
    const [isChanged, setIsChanged] = useState(false)
    const [error, setError] = useState("")

   
    const initialValues = {
      name:"",
      phone:""
  
  
    }
     const validationSchema = Yup.object({
        name:Yup.string().required("Required!").min(2).max(20),
      
        phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/,"Phone is not valid"),
      })
    async function handleSubmit(data){
    
     
      
      let response = await updateUserData(data.name,data.phone)
     

      if(response.message === "success"){
        setUserName(response.user.name)
        localStorage.setItem("userName",response.user.name)
      
     
   
        setIsChanged(true)
      
        
        
      }else{
        setError(true)

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
        <h1 className="text-3xl font-bold my-3">Update your data</h1>
        

        <p className="text-gray-600 mb-5">
        Enter your new data
    </p>

        </section>
        {error && <div className="bg-red-400 mx-auto text-center my-1 font-medium p-2 rounded-lg">An error occurred, please try again</div>}
        {isChanged && <div className="text-green-400 mx-auto text-center my-1 font-medium p-2 rounded-lg">Your data has been updated successfully</div>}
        <form className="relative flex flex-col justify-center items-center  " onSubmit={formik.handleSubmit}>

        <div className="mb-5">
          
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
      <input onChange={formik.handleChange}
       type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your name" 
        />
        {(formik.touched.name && formik.errors.name) && <small className="text-red-500">{formik.errors.name}</small> }
        
    </div>
    
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" name="phone" value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your phone"  />
      {(formik.touched.phone && formik.errors.phone) && <small className="text-red-500">{formik.errors.phone}</small> }
    </div>
    <button disabled={!formik.isValid} onClick={handleSubmit} type='submit' className='btn sm:w-1/3   ' >Confirm</button>
 
    
    </form>


    </div>
  )
}

