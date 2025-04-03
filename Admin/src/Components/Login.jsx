import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import registerImage from "../assets/login-registerImages/3d-illustration-smartphone-with-products-coming-out-screen-online-shopping-e-commerce-concept-min.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(true);
  const [adminFormData,setAdminFormData] = useState({
     email:'',
     password:''
  })

  // input handler
  function inputHandler(e){
    const {name,value} = e.target;
    setAdminFormData({
      ...adminFormData,
      [name]:value
    })
  }
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = axios.post(`/api/v1/adminUsers/login`, {
        email: adminFormData.email,
        password: adminFormData.password
      });
      const token = (await response).data.token;

      if(response){
        setAdminFormData({
          email: '',
          password:''
        })
        toast.success("Admin Logged in Successfully");
        setTimeout(() => {
          navigate("/dashboard");
      }, 600)
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminEmail", adminFormData.email);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow">
        <form className="flex flex-col overflow-y-auto md:flex-row" onSubmit={submitForm}>
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-center w-full h-full"
              src={registerImage}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Login
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700">Email</span>
                <input
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                  placeholder="example@abc.com"
                  type="email"
                  onChange={inputHandler}
                  value={adminFormData.email}
                  name="email"
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700">Password</span>
                <input
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input p-2"
                  placeholder="enter your password"
                  type={showPassword ? 'password' : 'text'}
                  onChange={inputHandler}
                  value={adminFormData.password}
                  name="password"
                />
              </label>
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
              {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
              <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                Log in
              </button>

              <hr className="my-8" />

              <p className="mt-4">
                <NavLink
                  className="text-sm font-medium text-purple-600 hover:underline"
                  to={"/forgotpassword"}
                >
                  Forgot your password?
                </NavLink>
              </p>
              <p className="mt-1">
                <NavLink
                  className="text-sm font-medium text-purple-600  hover:underline"
                  to={"/register"}
                >
                  Create account
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
