import { Link, useNavigate } from "react-router-dom"
import styles from "./Register.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const initialValues = {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""


  }
  async function handleRegister(data){
    setLoading(true)
    
    

    await axios
   .post("https://ecommerce.routemisr.com/api/v1/auth/signup",data)
   .then((res)=>{
    
    navigate("/login")
    setErrorMsg(null)
    setLoading(false)
   })
   .catch((err)=>{
   
    setErrorMsg(err.response.data.message)
    setLoading(false)
    
  })
    
  
    
 
   
   
  }
  const validationSchema = Yup.object({
    name:Yup.string().required("Required!").min(2).max(20),
    email:Yup.string().email("Invalid email format").required("Required!"),
    password:Yup.string().required("Required!").matches(/^[A-Za-z1-9]{6,15}$/,"Password is not valid"),
    rePassword:Yup.string().required().oneOf([Yup.ref("password")],"Password must be same"),
    phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/,"Phone is not valid"),
  })
  
  const formik = useFormik({
    initialValues,
    onSubmit:handleRegister,
    validationSchema,
  })


  return (
 <section className=" dark:bg-gray-900 w-1/2 mx-auto shaddow p-3 bg-gray-50">
  <h1 className="text-3xl font-bold my-3">Register Now :</h1>
  {errorMsg && <div className="bg-red-400 font-medium text-center">{errorMsg}</div>}

  <form onSubmit={formik.handleSubmit}>
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
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id="email" name="email" value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your email" />
      {(formik.touched.email && formik.errors.email) && <small className="text-red-500">{formik.errors.email}</small> }
    </div>
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="password" name="password" value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your password"  />
      {(formik.touched.password && formik.errors.password) && <small className="text-red-500">{formik.errors.password}</small> }
    </div>
    <div className="mb-5">
      <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="rePassword" name="rePassword" value={formik.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your rePassword"  />
      {(formik.touched.rePassword && formik.errors.rePassword) && <small className="text-red-500">{formik.errors.rePassword}</small> }
    </div>
    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id="phone" name="phone" value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your phone"  />
      {(formik.touched.phone && formik.errors.phone) && <small className="text-red-500">{formik.errors.phone}</small> }
    </div>
    {
      loading ?  <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:bg-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
      disabled ={true}
      >Loading....</button> :  <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:bg-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
      disabled={!formik.isValid}
      >Register</button>
    }
   
   <small className="text-gray-600">
  Already have an account?{" "}
  <Link
    to={"/login"}
    className="text-teal-500 hover:text-teal-600 font-medium transition-colors duration-200"
  >
    Login
  </Link>
</small>

  </form>


    

</section>

  )
}
