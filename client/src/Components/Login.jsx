import { NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import logoImg from '../assets/logo/2222.png'
import StoreImage from '../assets/Signin-out-images/store-4156934_1280.png'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useState } from 'react';
export default function Login() {
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState("");
  const [loginData,setLoginData]= useState({
    email : '',
    password : ''
  })
  const navigate = useNavigate();
  async function submitForm(e) {
    e.preventDefault();
    try {
      const response = axios.post(`/api/v1/users/login`, {
       email: loginData.email,
        password: loginData.password
      });
      const token = (await response).data.token;
      setLoginData({
        email: '',
        password:''
      })
      toast.success("User Logged in Successfully");
      setError('')
      setTimeout(() => {
        navigate("/");
      }, 4000);
      localStorage.setItem("token", token);
      localStorage.setItem("email", loginData.email);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  function loginDataHandler(e){
    const {name , value} = e.target;
    setLoginData({
      ...loginData,
      [name]:value
    })
    if(error) setError(null)
    }
  return (
    <div className="h-[80vh] my-[6rem]">
      <ToastContainer />
      <form onSubmit={submitForm} className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden bg-contain lg:block lg:w-1/2"
          style={{
            backgroundImage:
              `url(${StoreImage})`,
            }}
            />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src={logoImg}
              alt="logo"
              />
          </div>
          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
            name='email'
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              onChange={loginDataHandler}
              value={loginData.email}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <NavLink
                to={'/forgotpassword'}
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </NavLink>
            </div>
            <input
            name='password'
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type={showPassword ? `password`: `text`}
              onChange={loginDataHandler}
              value={loginData.password}
            />
            <div className='my-2'>
            <input type="checkbox" id='showPassword' onClick={()=> setShowPassword(!showPassword)}/>
            <label className="text-sm ml-1" htmlFor='showPassword'>Show Password</label>
        </div>
          </div>
          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
            <NavLink
              to={'/register'}
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or sign up
            </NavLink>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </div>
      </form>
    </div>
  );
}
