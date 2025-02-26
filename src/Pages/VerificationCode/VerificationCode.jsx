import * as Yup from "yup"
import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, validateYupSchema,  } from 'formik';
import { AuthenticationContext } from "../../Context/AuthenticationContext"


export default function VerificationCode() {
  const token = localStorage.getItem("token")
    const [codeArray, setCodeArray] = useState(Array(6).fill(''));
    const inputRefs = useRef([]);
    const [codeMessage, setCodeMessage] = useState('');
    const {forgotPassword,verifyResetCode}= useContext(AuthenticationContext)
    const [resendMessage, setResendMessage] = useState("")
    


    
    const handleChange = (index, event, setFieldValue, setFieldTouched) => {
        const value = event.target.value.slice(-1); // Only keep the last character
        const newCodeArray = [...codeArray];
        newCodeArray[index] = value;
        setCodeArray(newCodeArray);
      
        // Update Formik field value
        setFieldValue('resetCode', newCodeArray.join(''));
        setFieldTouched('resetCode', true, true);
      
        // Move focus to the next input field if the current field is filled
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        } else if (!value && index > 0) {
          // Move focus to the previous input field if the current field is empty
          inputRefs.current[index - 1].focus();
        }
      };
      async function resendCode() {
        let data = localStorage.getItem("userEmail")
      
        
        let response = await forgotPassword(data)
        if(response.statusMsg === "success"){
          setResendMessage(response.message)
          
          
        
          
        }
        
      }
      
      
      
    const verificationCodeSchema = Yup.object().shape({
        resetCode: Yup.string()
          .required('Verification code is required')
          .length(6, 'Verification code must be 6 characters long')
          .matches(/^[0-9]+$/, 'Verification code must be numeric'),
      });
   
    const navigate = useNavigate()
    const initialValues = { resetCode: '' };
   




   
    
      
      
    
    async function handleSubmit(values){
        const code = codeArray.join('');
        setResendMessage("")
        let response = await verifyResetCode(code)
        ;
        if(response.status === "Success"){
        
          navigate("/resetpassword")
        }
        if(response.name === "AxiosError"){
          setCodeMessage(response.response.data.message);
        }
        else {
              setCodeMessage('An unexpected error occurred. Please try again.');
            }
          
        
       
        
        

  
        
        

    }
    
      
      
  return (
    <div>
        <section className="  mx-auto text-center mt-9">
        <h1 className="text-3xl font-bold my-3">Password reset</h1>
        <p className="text-gray-600 p-2">
          Verification code sent to your email
        
    </p>

        </section>
        
        
    <Formik
      initialValues={initialValues}
      validationSchema={verificationCodeSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
    >
      {({ handleBlur, setFieldValue, setFieldTouched, isValid }) => (
        <Form className="verification-code-form">
        <div className="verification-code-inputs">
          {codeArray.map((_, index) => (
            <Field
              key={index}
              innerRef={(el) => (inputRefs.current[index] = el)}
              name={`code-${index}`}
              type="text"
              className="verification-code-input"
              maxLength="1"
              value={codeArray[index]}
              onChange={(e) => handleChange(index, e, setFieldValue, setFieldTouched)}
              onBlur={(e) => {
                handleBlur(e);
                setFieldTouched('resetCode', true, true); 
              }}
              inputMode="numeric" 
            />
          ))}
        </div>
        <ErrorMessage name="resetCode" component="div" className="error-message" />
{Error.resetCode && touched.resetCode && (
  <div className="error-message">{errors.resetCode}</div>

)}
 {codeMessage && (
            <div className="error-message">{codeMessage}</div>
          )}
           
          {resendMessage && (
  <div >
    
    <p className="text-green-400 font-bold">{resendMessage}</p>
  </div>
)}

          

         <p className="text-gray-600">
          Didn’t receive the email? <button onClick={resendCode}   type="button" className="text-blue-500 hover:text-blue-700">Click here</button> to resend.
        </p>
        <button type="submit" className="btn" disabled={!isValid}>
          Continue
        </button>
        {!token && 
         <Link to={"/login"} className='flex justify-center items-center gap-2  font-bold my-5'>
         <span><FaArrowLeftLong />
         </span>
         Back to log in
     
         </Link>}
         
        </Form>
      )}
    </Formik>


    </div>
  )
}
