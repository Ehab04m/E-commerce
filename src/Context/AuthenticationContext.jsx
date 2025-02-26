import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
export const AuthenticationContext = createContext(0);
export default function AuthenticationProvider(props) {
  const headers = {
    token:localStorage.getItem("token")
    
    
}
const [userEmail, setUserEmail] = useState("")
const [userName, setUserName] = useState("adel")
  function forgotPassword(data) {
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
      "email":data
  })
  .then((response) => response.data)  
  .catch((error) => error)
    
  }
  function verifyResetCode(data) {
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
      "resetCode":data
  })
  .then((response) => response.data)   
  .catch((error) => error)
    
  }
  function resetPassword(email,newPassword) {
    return  axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
      email:email,
      newPassword:newPassword
      
    }
   
  )
  .then((response) => response.data)   
  .catch((error) => error)
    
  }
  function updatePassword(currentPassword,password,rePassword) {
    return  axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,{
      currentPassword:currentPassword,
      password:password,
      rePassword:rePassword
      
    },{
      headers,
    }
   
  )
  .then((response) => response.data)   
  .catch((error) => error)
    
  }
  function updateUserData(name,phone) {
    return  axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,{
      name:name,
      phone:phone
      
    },{headers}
      
    
   
  )
  .then((response) => response.data)   
  .catch((error) => error)
    
  }
   
    
  return <AuthenticationContext.Provider value={{verifyResetCode,forgotPassword,resetPassword,updatePassword,updateUserData,userEmail,setUserEmail,userName,setUserName}}>
    {props.children}

  </AuthenticationContext.Provider>;
}

