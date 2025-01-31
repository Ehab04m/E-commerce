import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setToken} = useContext(TokenContext)

  const initialValues = {
    email:"",
    password:"",
  }
  async function handleLogin(data){
    setLoading(true)
    console.log(data);
   
    

    await axios
   .post("https://ecommerce.routemisr.com/api/v1/auth/signin",data)
   .then((res)=>{
    console.log(res);
    setToken(res.data.token)
    localStorage.setItem("token",res.data.token)
   
    
  
    navigate("/")
    setErrorMsg(null)
    setLoading(false)
   })
   .catch((err)=>{
    console.log(err);
    setErrorMsg(err.response.data.message)
    setLoading(false)
    
  })
    
  
    
 
   
   
  }
  const validationSchema = Yup.object({
   
    email:Yup.string().email("Invalid email format").required("Required!"),
    password:Yup.string().required("Required!").matches(/^[A-Za-z1-9]{6,15}$/,"Password is not valid")
  })

  
  const formik = useFormik({
    initialValues,
   
    onSubmit:handleLogin,
    validationSchema,
  })


  return (
 <section className=" dark:bg-gray-900 w-1/2 mx-auto shaddow p-3 bg-gray-50">
  <h1 className="text-3xl font-bold my-3">Login Now :</h1>
  {errorMsg && <div className="bg-red-400 font-medium text-center">{errorMsg}</div>}

  <form onSubmit={formik.handleSubmit}>

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
    {
      loading ?  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      disabled ={true}
      >Loading....</button> :  <button type="submit" className="btn"
      disabled={!formik.isValid}
      >Login</button>
    }
   
    <small>Dont have an Account ? <Link to={"/register"} >Register</Link></small>

  </form>


    

</section>

  )
}

