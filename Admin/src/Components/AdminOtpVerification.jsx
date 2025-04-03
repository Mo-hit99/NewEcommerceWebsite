import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function OtpVerification() {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
   
    async function submitForm(e) {
      e.preventDefault();
      try {
          const response = await axios.post(`/api/v1/AdminUsers/verify`,{code:code})
            if(response.status === 201){
                setError('')
                setCode('');
            }
          setTimeout(() => {
            navigate("/login")
          }, 3000);
        
      } catch (error) {
          setError(error.response?.data?.message)
      }
    
    }
    return (
        <div className="w-full h-screen p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Verify Otp</h2>
        <p className="text-center p-5 text-sm text-gray-600">Verify otp</p>
        {error && <p className="bg-red-500 rounded text-center text-white p-4">{error}</p>}
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
