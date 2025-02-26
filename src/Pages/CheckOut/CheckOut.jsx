import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from "yup"
import { CartContext } from '../../Context/CartContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CheckOut() {
  const {cashOndelivery,setCartId,setNumOfCartItems,onlinePayment} = useContext(CartContext)
  const navigate = useNavigate()
  const {state} = useLocation()

  

   
      const initialValues = {
        details:"",
        phone:"",
        city:"",
      
    
    
      }
    const validationSchema = Yup.object({
        details:Yup.string().required(),
        phone:Yup.string().required(),
        city:Yup.string().required()
          
      })

      async function handleSubmit(data){
        if(state === "online"){
        let response = await onlinePayment(data)
      
        if(response.status === "success"){
          window.location.href = response.session.url
        }

        }else{
        let response = await cashOndelivery({shippingAddress:data})
      
        if(response.status === "success"){
          navigate(`/allorders/${response.data.user}`)
          setCartId(null)
          setNumOfCartItems(0)
        }

        }
        
        
       
        
        
      }
      const formik = useFormik({
        initialValues,
        onSubmit:handleSubmit,
        validationSchema,
      })






  return (
    <div className=" dark:bg-gray-900 w-1/2 mx-auto shaddow p-3 bg-gray-50" >
      <h5 className='font-bold text-xl mb-4 '>CheckOut</h5>
     <form onSubmit={formik.handleSubmit}>
  <div className="mb-5">
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
      <input onChange={formik.handleChange}
       type="text"
        id="details"
        name="details"
        value={formik.values.details}
        onBlur={formik.handleBlur}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your details" 
        />
        {(formik.touched.details && formik.errors.details) && <small className="text-red-500">{formik.errors.details}</small> }
        
    </div>
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="phone" id="phone" name="phone" value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your phone" />
      {(formik.touched.phone && formik.errors.phone) && <small className="text-red-500">{formik.errors.phone}</small> }
    </div>
    <div className="mb-5">
      <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id="city" name="city" value={formik.values.city} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your city"  />
      {(formik.touched.city && formik.errors.city) && <small className="text-red-500">{formik.errors.city}</small> }
    </div>
    <button type='submit'
    className='btn w-full'>
      Pay


    </button>
   
    </form>
    </div>
   
  )
}
