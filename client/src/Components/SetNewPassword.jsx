import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SetNewPassword() {
  const navigate = useNavigate();
  const {token} = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/users/resetpassword/${token}`,
        {
          password,
        }
      );
      if (response) {
        toast.error("");
        setPassword("");
      }
      toast.success("Password Reset Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error({
        message: error?.response?.data?.message,
        message1: error?.response?.data?.message1,
        message2: error?.response?.data?.message2,
        message3: error?.response?.data?.message3,
      });
    }
  }
  return (
    <div className="w-full h-screen p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Set New Password
      </h2>
      <p className="text-center p-5 text-sm text-gray-600">
        To ensure your account is secure, please set a strong and unique
        password. Make sure it is at least 8 characters long, includes a mix of
        letters, numbers, and special characters.
      </p>
   
      <form onSubmit={submitForm} className="max-w-[50%] mx-auto">
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="email"
            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="my-2">
            <input
              type="checkbox"
              id="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            />
            <label className="text-sm ml-1" htmlFor="showPassword">
              Show Password
            </label>
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Set New Password
          </button>
        </div>
      </form>
    </div>
  );
}
