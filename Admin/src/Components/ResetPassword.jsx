import React, { useState } from "react";
import registerImage from "../assets/login-registerImages/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept-min.jpg";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/adminUsers/resetpassword/${token}`,
        {
          password,
        }
      );
      if (response) {
        toast.error("");
        setPassword("");
        toast.success("Password Reset Successfully");
        navigate("/login");
      }
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
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow">
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
            <form className="w-full" onSubmit={submitForm}>
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Reset password
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700">New Password</span>
              </label>
              <input
                className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                placeholder="Enter your new Password"
                type={showPassword ? "password" : "text"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
              <div className="w-full mt-4">
                <button className="bg-purple-600 text-white text-center w-full p-2 rounded">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
