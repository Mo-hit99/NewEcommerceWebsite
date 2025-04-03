import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function OtpVerification() {
    const [code, setCode] = useState('');
    const navigate = useNavigate();
   
    async function submitForm(e) {
      e.preventDefault();
      try {
          const response = await axios.post(`/api/v1/users/verify`,{code:code})
            if(response.status === 201){
                toast.error('')
                setCode('');
            }
            toast.success('User Verified Successfully')
          setTimeout(() => {
            navigate("/login")
          }, 3000);
        
      } catch (error) {
          toast.error(error.response?.data?.message)
      }
    
    }
    return (
        <div className="w-full h-screen p-6 bg-white rounded-lg shadow-lg">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Verify Otp</h2>
        <p className="text-center p-5 text-sm text-gray-600">Verify otp</p>
        <form onSubmit={submitForm} className="max-w-[50%] mx-auto">
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Verify Otp</label>
            <input value={code} onChange={(e)=> setCode(e.target.value)} type='text' id="otp" name="email" className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your Otp" />
          </div>
    
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
            Verify
            </button>
          </div>
        </form>
      </div>
      )
}
