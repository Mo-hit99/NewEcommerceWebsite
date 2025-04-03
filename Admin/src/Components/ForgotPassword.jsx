import React, { useState } from 'react'
import registerImage from '../assets/login-registerImages/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept-min.jpg'
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
export default function ForgotPassword() {

 const [email,setEmail] = useState('')
  const navigate = useNavigate();

  async function handleSubmit(e) {
   e.preventDefault();
   try {
     const response = await axios.post("/api/v1/AdminUsers/forgotpassword", { email });
     if(response){
        toast.success("Email Sent Successfully");
       navigate("/login");
     }  
   } catch (error) {
     console.log(error)
      toast.error(error.response?.data.message )
   }
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <ToastContainer/>
    <div
      className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow"
    >
      <div className="flex flex-col overflow-y-auto md:flex-row">
        <div className="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            className="object-center w-full h-full"
            src={registerImage}
            alt="Office"
          />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form className="w-full" onSubmit={handleSubmit}> 
            <h1
              className="mb-4 text-xl font-semibold text-gray-700"
            >
              Forgot password
            </h1>
            <label className="block text-sm">
              <span className="text-gray-700">Email</span>
            </label>
              <input
                className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                placeholder="Example@abc.com"
                type='email'
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                name='email'
              />
              <div className='w-full mt-4'>
                <button className='bg-purple-600 text-white text-center w-full p-2 rounded'>Send</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
