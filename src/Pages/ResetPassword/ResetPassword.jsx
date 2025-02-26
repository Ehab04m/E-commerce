import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Await, Link } from 'react-router-dom'
import * as Yup from "yup"
import { AuthenticationContext } from '../../Context/AuthenticationContext'

export default function ResetPassword() {
  const Token = localStorage.getItem("token")
    const {resetPassword} = useContext(AuthenticationContext)
    const [token, setToken] = useState(null)
    const initialValues = {
        
        newPassword:"",
      }
     const validationSchema = Yup.object({
       
        
        newPassword:Yup.string().required("Required!").matches(/^[A-Za-z1-9]{6,15}$/,"Password is not valid")
      })
      async function handlePassword(values) {
        let email = localStorage.getItem("userEmail")
        let newPassword = values.newPassword
        
        let response = await resetPassword(email,newPassword)
        if(response.token){
         
          setToken(response.token)
          
        }

      
        
      
        
        
      }
    const formik = useFormik({
        initialValues,
       
        onSubmit:handlePassword,
        validationSchema,
      })
  return (
    <div>
    <section className="  mx-auto text-center mt-9">
    <h1 className="text-3xl font-bold my-3">Set new password</h1>
    <p className="text-gray-600">
Must be at least 6 characters</p>

    </section>
    <form className="relative flex flex-col justify-center items-center " onSubmit={formik.handleSubmit}>

<div className="mb-5 w-1/2 mx-auto mt-6 translate-x-5">
  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> New password</label>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id="newPassword" name="newPassword" value={formik.values.newPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter new password" />
  
  {(formik.touched.newPassword && formik.errors.newPassword) && <small className="text-red-500">{formik.errors.newPassword}</small> }

  {
  token ?
  !Token ?
   <small className="text-green-500">Password has been reset successfully, back to log in</small> :
   <small className="text-green-500">Password has been reset successfully</small> : <Await condition={!token} fallback={<small className="text-red-500">Password has not been reset successfully</small>} />}

</div>

<button disabled={!formik.isValid}  type='submit' className='btn sm:w-1/3  ' >Reset password</button>
{!Token && <Link to={"/login"} className='flex justify-center items-center gap-2  font-bold my-5'>
<span><FaArrowLeftLong />
</span>
Back to log in

</Link>}

</form>


</div>
  
  )
}
